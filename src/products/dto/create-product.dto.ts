import { IsString, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateProductDto {
	@ApiProperty({ example: 'Nike Jacket', description: 'Product name' })
	@IsString({ message: 'Must be a string' })
	@Length(3, 30, {
		message: 'At least 3 characters and no more than 30 characters',
	})
	readonly name: string

	@ApiProperty({
		example: 'Lorem ipsum dolor',
		description: 'Product description',
	})
	@IsString({ message: 'Must be a string' })
	@Length(10, 100, {
		message: 'At least 10 characters and no more than 100 characters',
	})
	readonly description: string

	@ApiProperty({ example: [1, 2, 3, 4], description: 'Product sizes' })
	@IsString({ message: 'Must be a number' })
	readonly sizesId: string

	@ApiProperty({
		example: '[{ title: "Width", description: "100" }]',
		description: 'Product info',
	})
	@IsString({ message: 'Must be a string' })
	readonly info: string

	@ApiProperty({ example: 200, description: 'Product price' })
	readonly price: number

	@ApiProperty({ example: 1, description: 'Category Id' })
	readonly categoryId: number

	@ApiProperty({ example: 1, description: 'Category-for Id' })
	readonly categoryForId: number
}
