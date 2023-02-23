import { IsInt, IsString, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AddRoleDto {
	@ApiProperty({ example: 'Admin', description: 'Role value' })
	@IsString({ message: 'Must be a string' })
	@Length(3, 20, {
		message: 'At least 3 characters and no more than 20 characters',
	})
	readonly value: string

	@ApiProperty({ example: 1, description: 'User Id' })
	@IsInt({ message: 'Must be a number' })
	readonly userId: number
}
