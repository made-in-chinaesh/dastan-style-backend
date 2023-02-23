import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { Product } from '../products/models/products.model'
import { ApiProperty } from '@nestjs/swagger'

interface CategoryForCreationAttrs {
	name: string
}

@Table({
	tableName: 'category-for',
})
export class CategoryFor extends Model<CategoryFor, CategoryForCreationAttrs> {
	@ApiProperty({ example: 1, description: 'Category-for Id' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ApiProperty({ example: 'Women', description: 'Category-for name' })
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	name: string

	@HasMany(() => Product)
	products: Product[]
}
