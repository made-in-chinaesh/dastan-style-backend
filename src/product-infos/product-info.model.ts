import {
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'
import { Product } from '../products/models/products.model'
import { ApiProperty } from '@nestjs/swagger'

interface ProductInfoCreationAttrs {
	title: string
	description: string
	productId: number
}
@Table({ tableName: 'product-info', createdAt: false, updatedAt: false })
export class ProductInfo extends Model<ProductInfo, ProductInfoCreationAttrs> {
	@ApiProperty({ example: 1, description: 'Product-info Id' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ApiProperty({ example: 'Width', description: 'Product-info title' })
	@Column({ type: DataType.STRING, allowNull: false })
	title: string

	@ApiProperty({
		example: 'Lorem ipsum dolor',
		description: 'Product-info description',
	})
	@Column({ type: DataType.STRING, allowNull: false })
	description: string

	@ApiProperty({ example: 1, description: 'Product Id' })
	@ForeignKey(() => Product)
	@Column({ type: DataType.INTEGER, allowNull: false })
	productId: number
}
