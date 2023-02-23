import {
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'
import { Product } from '../../products/models/products.model'
import { ApiProperty } from '@nestjs/swagger'

interface ReviewCreationAttrs {
	name: string
	description: string
	rating: number
	productId: number
}

@Table({ tableName: 'reviews' })
export class Review extends Model<Review, ReviewCreationAttrs> {
	@ApiProperty({ example: 1, description: 'Review Id' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ApiProperty({ example: 'John', description: 'Name for review' })
	@Column({ type: DataType.STRING, allowNull: false })
	name: string

	@ApiProperty({
		example: 'Nice product so cool',
		description: 'Description for review',
	})
	@Column({ type: DataType.STRING, allowNull: false })
	description: string

	@ApiProperty({ example: 5, description: 'Product Rating' })
	@Column({ type: DataType.INTEGER, allowNull: false })
	rating: number

	@ApiProperty({ example: 1, description: 'Product Id' })
	@ForeignKey(() => Product)
	@Column({ type: DataType.INTEGER })
	productId: number
}
