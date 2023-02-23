import { IsInt, IsString, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class EditCategoryForDto {
	@ApiProperty({ example: 1, description: 'Category-for id' })
	@IsInt({ message: 'Must be a number' })
	readonly id: number

	@ApiProperty({ example: 'Children', description: 'New category-for name' })
	@IsString({ message: 'Must be a string' })
	@Length(3, 20, {
		message: 'At least 3 characters and no more than 20 characters',
	})
	readonly name: string
}
