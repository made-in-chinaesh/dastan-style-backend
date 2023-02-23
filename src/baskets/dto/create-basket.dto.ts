import { IsInt } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateBasketDto {
	@ApiProperty({ example: 1, description: 'User Id' })
	@IsInt({ message: 'Must be a number' })
	userId: number
}
