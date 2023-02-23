import {
	Column,
	DataType,
	Table,
	Model,
	BelongsToMany,
	HasMany,
	HasOne,
} from 'sequelize-typescript'
import { UserRoles } from '../../roles/models/user-roles.model'
import { Role } from '../../roles/models/roles.model'
import { ApiProperty } from '@nestjs/swagger'
import { Basket } from '../../baskets/models/baskets.model'
import { BasketProducts } from '../../baskets/models/basket-products.model'

interface UserCreationAttrs {
	username: string
	password: string
}
@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
	@ApiProperty({ example: 1, description: 'User Id' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ApiProperty({ example: 'lolo', description: 'Username' })
	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: false,
	})
	username: string

	@ApiProperty({ example: 'test1234', description: 'User password' })
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	password: string

	@BelongsToMany(() => Role, () => UserRoles)
	roles: Role[]

	@HasOne(() => Basket)
	basket: Basket
}
