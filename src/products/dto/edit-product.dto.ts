import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsString, Length } from 'class-validator'

export class EditProductDto {
	@ApiProperty({ example: 1, description: 'Product Id' })
	@IsInt({ message: 'Must be a number' })
	id: number

	@ApiProperty({ example: 'Nike Jacket', description: 'Product name' })
	@IsString({ message: 'Must be a string' })
	@Length(3, 30, {
		message: 'At least 3 characters and no more than 30 characters',
	})
	name: string

	@ApiProperty({
		example: 'Lorem ipsum dolor',
		description: 'Product description',
	})
	@IsString({ message: 'Must be a string' })
	@Length(10, 100, {
		message: 'At least 10 characters and no more than 100 characters',
	})
	description: string

	@ApiProperty({ example: 200, description: 'Product price' })
	@IsInt({ message: 'Must be a number' })
	@ApiProperty({ example: 1, description: 'Category Id' })
	@IsInt({ message: 'Must be a number' })
	categoryId: number

	@ApiProperty({ example: 1, description: 'Category-for Id' })
	@IsInt({ message: 'Must be a number' })
	categoryForId: number
}
