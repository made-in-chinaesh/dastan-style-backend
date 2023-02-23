import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Category } from './categories.model'
import { CreateCategoryDto } from './dto/create-category.dto'
import { EditCategoryDto } from './dto/edit-category.dto'
import { DeleteResponse, EditResponse } from '../types/swagger'

@Injectable()
export class CategoriesService {
	constructor(
		@InjectModel(Category) private categoryRepository: typeof Category
	) {}

	async createCategory(dto: CreateCategoryDto): Promise<Category> {
		try {
			const category = await this.getCategoryByName(dto.name)

			if (category) {
				throw new HttpException(
					`This category with ${dto.name} is already exist`,
					HttpStatus.CREATED
				)
			}

			return await this.categoryRepository.create(dto)
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async deleteCategory(id: number): Promise<DeleteResponse> {
		try {
			const category = await this.categoryRepository.destroy({ where: { id } })
			return {
				message: 'Success deleted',
				data: category,
			}
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async editCategory(dto: EditCategoryDto): Promise<EditResponse> {
		try {
			const category = await this.categoryRepository.upsert(dto)
			return {
				message: 'Success update!',
				data: category,
			}
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async getAllCategories(): Promise<Category[]> {
		return await this.categoryRepository.findAll()
	}

	private async getCategoryByName(name: string): Promise<Category> {
		return await this.categoryRepository.findOne({ where: { name } })
	}
}
