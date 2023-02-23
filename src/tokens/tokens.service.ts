import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ITokensResponse, IUserPayload } from '../types/types'

@Injectable()
export class TokensService {
	constructor(private jwtService: JwtService) {}

	async generateTokens(user: IUserPayload): Promise<ITokensResponse> {
		try {
			const payload = {
				id: user.id,
				username: user.username,
				roles: user.roles,
			}

			const accessToken = await this.createToken(payload, true)
			const refreshToken = await this.createToken(payload, false)

			return {
				accessToken,
				refreshToken,
			}
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async createToken(
		payload: IUserPayload,
		isAccessToken: boolean
	): Promise<string> {
		return await this.jwtService.signAsync(payload, {
			expiresIn: isAccessToken ? '20min' : '1h',
			secret: isAccessToken
				? process.env.ACCESS_TOKEN_SECRET
				: process.env.REFRESH_TOKEN_SECRET,
		})
	}

	async validateToken(token) {
		try {
			return await this.jwtService.verifyAsync(token, {
				secret: process.env.REFRESH_TOKEN_SECRET,
			})
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}
}
