import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { TokensService } from '../tokens/tokens.service'
import { IAuthResponse } from '../types/types'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { User } from '../users/models/users.model'
import { UsersService } from '../users/users.service'
import { Role } from './../roles/models/roles.model'

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private tokensService: TokensService
	) {}

	async registration(dto: CreateUserDto): Promise<IAuthResponse> {
		try {
			const candidate = await this.usersService.getUserByUsername(
				dto.username
			)

			if (candidate) {
				throw new HttpException(
					'This username is already exist',
					HttpStatus.CREATED
				)
			}

			const hashPassword = await bcrypt.hash(dto.password, 5)

			const user = await this.usersService.createUser({
				...dto,
				password: hashPassword,
			})

			const isAdmin = this.checkUser(user.roles)

			const tokens = await this.tokensService.generateTokens(user)

			return {
				id: user.id,
				username: user.username,
				isAdmin,
				...tokens,
			}
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async login(dto: CreateUserDto): Promise<IAuthResponse> {
		try {
			const user = await this.validateUser(dto)

			const isAdmin = this.checkUser(user.roles)

			const tokens = await this.tokensService.generateTokens(user)

			return {
				id: user.id,
				username: user.username,
				isAdmin,
				...tokens,
			}
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async refresh(refreshToken) {
		try {
			const validate = await this.tokensService.validateToken(
				refreshToken
			)

			if (!validate) {
				throw new HttpException('Wrong token', HttpStatus.BAD_REQUEST)
			}

			const payload = {
				id: validate.id,
				username: validate.username,
				roles: validate.roles,
			}

			return await this.tokensService.generateTokens(payload)
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	private async validateUser(userDto: CreateUserDto): Promise<User> {
		const user = await this.usersService.getUserByUsername(userDto.username)

		if (!user) {
			throw new HttpException(
				`Пользователя под именем ${userDto.username} не существует`,
				HttpStatus.NOT_FOUND
			)
		}

		const passwordEquals = await bcrypt.compare(
			userDto.password,
			user.password
		)
		if (user && passwordEquals) {
			return user
		}

		throw new HttpException('Неверный пароль', HttpStatus.BAD_REQUEST)
	}

	private checkUser(roles: Role[]) {
		let isAdmin = false

		roles.forEach(role => {
			if (role.value === 'ADMIN') isAdmin = true
		})

		return isAdmin
	}
}
