import {
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'
import { Product } from '../products/models/products.model'

interface ProductImagesCreationAttrs {
	image: string
	productId: number
}

@Table({ tableName: 'product-images', createdAt: false, updatedAt: false })
export class ProductImages extends Model<
	ProductImages,
	ProductImagesCreationAttrs
> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		primaryKey: true,
		autoIncrement: true,
	})
	id: number

	@Column({ type: DataType.STRING, allowNull: false })
	image: string

	@ForeignKey(() => Product)
	@Column({ type: DataType.INTEGER })
	productId: number
}
