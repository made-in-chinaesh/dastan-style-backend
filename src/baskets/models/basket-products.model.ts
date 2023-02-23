import {
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { Basket } from './baskets.model'
import { Product } from '../../products/models/products.model'

interface BasketProductsCreationAttrs {
	basketId: number
	productId: number
}

@Table({ tableName: 'basket-products', createdAt: false, updatedAt: false })
export class BasketProducts extends Model<
	BasketProducts,
	BasketProductsCreationAttrs
> {
	@ApiProperty({ example: 1, description: 'Basket-product Id' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ApiProperty({ example: 1, description: 'Basket Id' })
	@Column({ type: DataType.INTEGER, allowNull: false })
	count: number

	@ApiProperty({ example: 1, description: 'Basket Id' })
	@ForeignKey(() => Basket)
	@Column({ type: DataType.INTEGER })
	basketId: number

	@ApiProperty({ example: 1, description: 'Product Id' })
	@ForeignKey(() => Product)
	@Column({ type: DataType.INTEGER })
	productId: number
}
