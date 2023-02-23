import { IsString, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
	@ApiProperty({ example: 'pasha', description: 'Username' })
	@IsString({ message: 'Must be a string' })
	@Length(3, 20, {
		message: 'At least 3 characters and no more than 20 characters',
	})
	readonly username: string

	@ApiProperty({ example: 'test1234', description: 'User password' })
	@IsString({ message: 'Must be a string' })
	@Length(4, 8, {
		message: 'At least 4 characters and no more than 8 characters',
	})
	readonly password: string
}
