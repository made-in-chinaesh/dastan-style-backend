import {
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'
import { Role } from './roles.model'
import { User } from '../../users/models/users.model'
import { ApiProperty } from '@nestjs/swagger'

@Table({
	tableName: 'user_roles',
	createdAt: false,
	updatedAt: false,
})
export class UserRoles extends Model<UserRoles> {
	@ApiProperty({ example: 1, description: 'User-role Id' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ApiProperty({ example: 1, description: 'Role Id' })
	@ForeignKey(() => Role)
	@Column({ type: DataType.INTEGER })
	roleId: number

	@ApiProperty({ example: 1, description: 'User Id' })
	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	userId: number
}
