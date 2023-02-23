import { Role } from '../roles/models/roles.model'

export interface IAuthResponse {
	id: number
	username: string
	accessToken: string
	refreshToken: string
	isAdmin: boolean
}

export interface IImagesFields {
	id: number
	image: string
}

export interface IUserPayload {
	id: number
	username: string
	roles: Role[]
}

export interface ITokensResponse {
	accessToken: string
	refreshToken: string
}
