import { IsString, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateRoleDto {
	@ApiProperty({ example: 'Admin', description: 'Role value' })
	@IsString({ message: 'Must be a string' })
	@Length(3, 20, {
		message: 'At least 3 characters and no more than 20 characters',
	})
	readonly value: string

	@ApiProperty({
		example: 'Lorem ipsum dolor',
		description: 'Role description',
	})
	@IsString({ message: 'Must be a string' })
	@Length(3, 50, {
		message: 'At least 3 characters and no more than 50 characters',
	})
	readonly description: string
}
