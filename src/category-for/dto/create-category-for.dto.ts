import { IsString, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCategoryForDto {
	@ApiProperty({ example: 'Man', description: 'Category-for name' })
	@IsString({ message: 'Must be a string' })
	@Length(3, 20, {
		message: 'At least 3 characters and no more than 20 characters',
	})
	readonly name: string
}
