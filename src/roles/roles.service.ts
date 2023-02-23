import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { InjectModel } from '@nestjs/sequelize'
import { Role } from './models/roles.model'

@Injectable()
export class RolesService {
	constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

	async createRole(dto: CreateRoleDto): Promise<Role> {
		try {
			return await this.roleRepository.create(dto)
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async getRoleByValue(value: string): Promise<Role> {
		return await this.roleRepository.findOne({ where: { value } })
	}
}
