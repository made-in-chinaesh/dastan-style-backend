import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { BasketsService } from '../baskets/baskets.service'
import { Role } from '../roles/models/roles.model'
import { RolesService } from '../roles/roles.service'
import { AddRoleDto } from './dto/add-role.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './models/users.model'

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User) private userRepository: typeof User,
		private rolesService: RolesService,
		private basketsService: BasketsService
	) {}

	async createUser(dto: CreateUserDto): Promise<User> {
		const user = await this.userRepository.create(dto)
		const role = await this.rolesService.getRoleByValue('USER')
		const basket = await this.basketsService.createBasket(user.id)
		user.$set('roles', [role.id])
		user.roles = [role]
		return user
	}

	async getAllUsers(): Promise<User[]> {
		return await this.userRepository.findAll({
			include: { all: true },
		})
	}

	async addRole(dto: AddRoleDto): Promise<any> {
		try {
			const user = await this.userRepository.findByPk(dto.userId)
			const role = await this.rolesService.getRoleByValue(dto.value)

			if (user && role) {
				await user.$add('role', role.id)
				return {
					message: 'Success added role',
					data: dto,
				}
			}
			throw new HttpException(
				'User or role not found!',
				HttpStatus.NOT_FOUND
			)
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async getUserByUsername(username: string): Promise<User> {
		return await this.userRepository.findOne({
			where: { username },
			include: { model: Role, as: 'roles' },
		})
	}
}
