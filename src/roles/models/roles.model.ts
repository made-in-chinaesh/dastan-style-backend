import {
	BelongsToMany,
	Column,
	DataType,
	Model,
	Table,
} from 'sequelize-typescript'
import { User } from '../../users/models/users.model'
import { UserRoles } from './user-roles.model'
import { ApiProperty } from '@nestjs/swagger'

interface RoleCreationAttrs {
	value: string
	description: string
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
	@ApiProperty({ example: 1, description: 'Role Id' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ApiProperty({ example: 'Admin', description: 'Role value' })
	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: false,
	})
	value: string

	@ApiProperty({
		example: 'Will add new products',
		description: 'Role description',
	})
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	description: string

	@BelongsToMany(() => User, () => UserRoles)
	users: User[]
}
