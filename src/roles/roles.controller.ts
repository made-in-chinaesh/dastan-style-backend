import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../auth/roles-auth.decorator'
import { ValidationPipe } from '../pipes/validation.pipe'
import { CreateRoleDto } from './dto/create-role.dto'
import { Role } from './models/roles.model'
import { RolesService } from './roles.service'

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
	constructor(private rolesService: RolesService) {}

	@ApiOperation({ summary: 'Create role' })
	@ApiResponse({ status: 200, type: Role })
	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Post()
	createRole(@Body(new ValidationPipe()) dto: CreateRoleDto) {
		return this.rolesService.createRole(dto)
	}

	@ApiOperation({ summary: 'Get role by value' })
	@ApiResponse({ status: 200, type: Role })
	@Get('/:value')
	getRoleByValue(@Param('value') value: string) {
		return this.rolesService.getRoleByValue(value)
	}
}
