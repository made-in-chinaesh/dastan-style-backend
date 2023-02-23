import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsString, Length } from 'class-validator'

export class EditProductInfoDto {
	@ApiProperty({ example: 1, description: 'Product-info Id' })
	readonly id: number

	@ApiProperty({ example: 'Width', description: 'Product-info title' })
	@IsString({ message: 'Must be a string' })
	@Length(3, 20, {
		message: 'At least 3 characters and no more than 20 characters',
	})
	title: string

	@ApiProperty({ example: '300sm', description: 'Product-info description' })
	@IsString({ message: 'Must be a string' })
	@Length(3, 40, {
		message: 'At least 3 characters and no more than 20 characters',
	})
	description: string
}
