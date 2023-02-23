import { ApiProperty } from '@nestjs/swagger'
import {
	BelongsToMany,
	Column,
	DataType,
	Model,
	Table,
} from 'sequelize-typescript'
import { ProductSizes } from '../products/models/product-sizes.model'
import { Product } from '../products/models/products.model'

interface SizeCreationAttrs {
	size: string
}

@Table({ tableName: 'sizes' })
export class Size extends Model<Size, SizeCreationAttrs> {
	@ApiProperty({ example: 1, description: 'Size Id' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ApiProperty({ example: 'S', description: 'Size for product' })
	@Column({
		type: DataType.STRING,
		unique: true,
	})
	size: string

	@BelongsToMany(() => Product, () => ProductSizes)
	products: Product[]
}
