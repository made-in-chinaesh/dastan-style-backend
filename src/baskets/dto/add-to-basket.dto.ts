import { IsInt } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AddToBasketDto {
	@ApiProperty({ example: 1, description: 'Basket Id' })
	@IsInt({ message: 'Must be a number' })
	basketId: number

	@ApiProperty({ example: 1, description: 'Product Id' })
	@IsInt({ message: 'Must be a number' })
	productId: number

	@ApiProperty({ example: 5, description: 'Product count' })
	@IsInt({ message: 'Must be a number' })
	count: number
}
