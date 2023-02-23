import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../auth/roles-auth.decorator'
import { AddRoleDto } from './dto/add-role.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from './models/users.model'
import { AddRoleResponse } from '../types/swagger'
import { ValidationPipe } from '../pipes/validation.pipe'

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@ApiOperation({ summary: 'Get all users' })
	@ApiResponse({ status: 200, type: [User] })
	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Get()
	getAllUsers() {
		return this.usersService.getAllUsers()
	}

	@ApiOperation({ summary: 'Add role' })
	@ApiResponse({ status: 200, type: AddRoleResponse })
	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Post('/role')
	addRole(@Body(new ValidationPipe()) dto: AddRoleDto) {
		return this.usersService.addRole(dto)
	}
}
