import {
	BelongsTo,
	BelongsToMany,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript'
import { Category } from '../../categories/categories.model'
import { CategoryFor } from '../../category-for/category-for.model'
import { Size } from '../../sizes/sizes.model'
import { ProductSizes } from './product-sizes.model'
import { ProductInfo } from '../../product-infos/product-info.model'
import { ApiProperty } from '@nestjs/swagger'
import { Basket } from '../../baskets/models/baskets.model'
import { BasketProducts } from '../../baskets/models/basket-products.model'
import { ProductImages } from '../../product-images/product-images.model'
import { Review } from '../../reviews/models/reviews.model'

interface ProductCreationAttrs {
	name: string
	description: string
	info: ProductInfo[]
	categoryId: number
	categoryForId: number
	price: number
}

@Table({
	tableName: 'products',
})
export class Product extends Model<Product, ProductCreationAttrs> {
	@ApiProperty({ example: 1, description: 'Product Id' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ApiProperty({ example: 'Nike Jacket', description: 'Product name' })
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	name: string

	@ApiProperty({
		example: 'lorem ipsum dolor',
		description: 'Product description',
	})
	@Column({ type: DataType.STRING, allowNull: false })
	description: string

	@ApiProperty({ example: 900, description: 'Product price' })
	@Column({ type: DataType.INTEGER, allowNull: false })
	price: number

	@ApiProperty({ example: 1, description: 'Product views' })
	@Column({ type: DataType.INTEGER, defaultValue: 0 })
	views: number

	@ApiProperty({
		example: '/video/9oli1nine2two',
		description: 'Product video path',
	})
	@ApiProperty({ example: 1, description: 'Category Id' })
	@ForeignKey(() => Category)
	@Column({ type: DataType.INTEGER })
	categoryId: number

	@ApiProperty({ example: 1, description: 'Category-for Id' })
	@ForeignKey(() => CategoryFor)
	@Column({ type: DataType.INTEGER })
	categoryForId: number

	@BelongsToMany(() => Size, () => ProductSizes)
	sizes: Size[]

	@HasMany(() => ProductInfo)
	info: ProductInfo[]

	@BelongsTo(() => Category)
	category: Category

	@BelongsTo(() => CategoryFor)
	categoryFor: CategoryFor

	@HasMany(() => ProductImages)
	images: ProductImages[]

	@BelongsToMany(() => Basket, () => BasketProducts)
	baskets: Basket[]

	@HasMany(() => Review)
	reviews: Review[]
}
