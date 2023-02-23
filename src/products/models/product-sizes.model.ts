import {
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'
import { Size } from '../../sizes/sizes.model'
import { Product } from './products.model'
import { ApiProperty } from '@nestjs/swagger'

interface ProductSizesCreationAttrs {
	sizeId: number
	productId: number
}

@Table({ tableName: 'product_sizes', createdAt: false, updatedAt: false })
export class ProductSizes extends Model<
	ProductSizes,
	ProductSizesCreationAttrs
> {
	@ApiProperty({ example: 1, description: 'Product-size Id' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ApiProperty({ example: 1, description: 'Size Id' })
	@ForeignKey(() => Size)
	@Column({ type: DataType.INTEGER })
	sizeId: number

	@ApiProperty({ example: 1, description: 'Product Id' })
	@ForeignKey(() => Product)
	@Column({ type: DataType.INTEGER })
	productId: number
}
