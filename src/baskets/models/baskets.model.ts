import {
	BelongsToMany,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { User } from '../../users/models/users.model'
import { Product } from '../../products/models/products.model'
import { BasketProducts } from './basket-products.model'

interface BasketCreationAttrs {
	userId: number
}

@Table({ tableName: 'baskets' })
export class Basket extends Model<Basket, BasketCreationAttrs> {
	@ApiProperty({ example: 1, description: 'Basket Id' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ApiProperty({ example: 1, description: 'User Id' })
	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	userId: number

	@BelongsToMany(() => Product, () => BasketProducts)
	products: Product[]
}
