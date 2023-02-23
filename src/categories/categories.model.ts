import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { Product } from '../products/models/products.model'
import { ApiProperty } from '@nestjs/swagger'

interface CategoryCreationAttrs {
	name: string
}

@Table({
	tableName: 'categories',
})
export class Category extends Model<Category, CategoryCreationAttrs> {
	@ApiProperty({ example: 1, description: 'Category Id' })
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		unique: true,
		primaryKey: true,
	})
	id: number

	@ApiProperty({ example: 'Sweater', description: 'Category name' })
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	name: string

	@HasMany(() => Product)
	products: Product[]
}
