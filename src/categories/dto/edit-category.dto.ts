import { IsInt, IsString, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class EditCategoryDto {
	@ApiProperty({ example: 1, description: 'Category id' })
	@IsInt({ message: 'Must be a number' })
	readonly id: number

	@ApiProperty({ example: 'T-shirt', description: 'New category name' })
	@IsString({ message: 'Must be a string' })
	@Length(3, 20, {
		message: 'At least 3 characters and no more than 20 characters',
	})
	readonly name: string
}
