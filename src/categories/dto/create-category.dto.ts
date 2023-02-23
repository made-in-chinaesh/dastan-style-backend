import { IsString, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCategoryDto {
	@ApiProperty({ example: 'Shirt', description: 'Category name' })
	@IsString({ message: 'Must be a string' })
	@Length(3, 20, {
		message: 'At least 3 characters and no more than 20 characters',
	})
	readonly name: string
}
