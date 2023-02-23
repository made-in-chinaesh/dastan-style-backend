import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsString } from 'class-validator'

export class CreateReviewDto {
	@ApiProperty({ example: 'John', description: 'Review Author' })
	@IsString({ message: 'Must be a string' })
	readonly name: string

	@ApiProperty({
		example: "That's very cool site you now",
		description: 'Review description',
	})
	@IsString({ message: 'Must be a string' })
	readonly description: string

	@ApiProperty({ example: 1, description: 'Product Id' })
	@IsInt({ message: 'Must be  number' })
	readonly productId: number
}
