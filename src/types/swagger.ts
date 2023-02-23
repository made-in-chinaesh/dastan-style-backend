import { ApiProperty } from '@nestjs/swagger'
import { AddRoleDto } from '../users/dto/add-role.dto'

export class CreateResponse {
	@ApiProperty({ example: 'Success deleted', description: 'message' })
	message: string
	@ApiProperty({ example: 1, description: 'data' })
	data: any
}

export class AddResponse {
	@ApiProperty({ example: 'Success added', description: 'message' })
	message: string
	@ApiProperty({ example: 1, description: 'data' })
	data: any
}

export class DeleteResponse {
	@ApiProperty({ example: 'Success deleted', description: 'message' })
	message: string
	@ApiProperty({ example: 1, description: 'data' })
	data: any
}

export class EditResponse {
	@ApiProperty({ example: 'Success edited', description: 'message' })
	message: string
	@ApiProperty({ example: 1, description: 'data' })
	data: any
}

export class UserAuthResponse {
	@ApiProperty({ example: 1, description: 'Id' })
	id: number

	@ApiProperty({ example: 'pasha', description: 'Username' })
	username: string

	@ApiProperty({
		example: '2m234mb234bv234jvh234',
		description: 'Access-token',
	})
	accessToken: string

	@ApiProperty({
		example: '2m234mb234bv234jvh234',
		description: 'Refresh-token',
	})
	refreshTokeM: string
}

export class RefreshUserTokensResponse {
	@ApiProperty({
		example: '2m234mb234bv234jvh234',
		description: 'Access-token',
	})
	accessToken: string

	@ApiProperty({
		example: '2m234mb234bv234jvh234',
		description: 'Refresh-token',
	})
	refreshTokeM: string
}

export class AddRoleResponse {
	@ApiProperty({ example: 'Success added role', description: 'message' })
	message: string
	@ApiProperty({ example: AddRoleDto, description: 'data' })
	data: any
}
