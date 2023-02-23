import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { RefreshUserTokensResponse, UserAuthResponse } from '../types/swagger'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@ApiOperation({ summary: 'Registration' })
	@ApiResponse({ status: 200, type: UserAuthResponse })
	@Post('/registration')
	registration(@Body() dto: CreateUserDto) {
		return this.authService.registration(dto)
	}

	@ApiOperation({ summary: 'Login' })
	@ApiResponse({ status: 200, type: UserAuthResponse })
	@Post('/login')
	login(@Body() dto: CreateUserDto) {
		return this.authService.login(dto)
	}

	@ApiOperation({ summary: 'Refresh' })
	@ApiResponse({ status: 200, type: RefreshUserTokensResponse })
	@Post('/refresh')
	refresh(@Body() data) {
		return this.authService.refresh(data.refreshToken)
	}
}
