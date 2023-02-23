import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateSizeDto {
	@ApiProperty({ example: 'S', description: 'Size' })
	@IsString({ message: 'Must be a string' })
	readonly size: string
}
