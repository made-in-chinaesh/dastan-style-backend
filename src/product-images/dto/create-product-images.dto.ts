import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsString } from 'class-validator'

export class CreateProductImagesDto {
	@ApiProperty({
		example: '3s5ds2sdf5sda5dst5a.jpg',
		description: 'Image path',
	})
	@IsString({ message: 'Must be a string' })
	readonly image: string

	@ApiProperty({ example: 1, description: 'Product Id' })
	@IsInt({ message: 'Must be a string' })
	readonly productId: number
}
