import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsString } from 'class-validator'

export class DeleteProductImagesDto {
	@ApiProperty({ example: 1, description: 'Product-image Id' })
	@IsInt({ message: 'Must be a number' })
	readonly id: number

	@ApiProperty({
		example: 'images/123/32f32dsf34dsf.jpg',
		description: 'Product-image file-name',
	})
	@IsString({ message: 'Must be a string' })
	readonly fileName: string
}
