import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CategoryFor } from './category-for.model'
import { CreateCategoryForDto } from './dto/create-category-for.dto'
import { EditCategoryForDto } from './dto/edit-category-for.dto'
import { DeleteResponse, EditResponse } from '../types/swagger'

@Injectable()
export class CategoryForService {
	constructor(
		@InjectModel(CategoryFor) private categoryForRepository: typeof CategoryFor
	) {}

	async createCategoryFor(dto: CreateCategoryForDto): Promise<CategoryFor> {
		try {
			const categoryFor = await this.getCategoryForByName(dto.name)

			if (categoryFor) {
				throw new HttpException(
					`This category-for with ${dto.name} is already exist`,
					HttpStatus.CREATED
				)
			}

			return await this.categoryForRepository.create(dto)
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async deleteCategoryFor(id: number): Promise<DeleteResponse> {
		try {
			const categoryFor = await this.categoryForRepository.destroy({
				where: { id },
			})
			return {
				message: 'Success deleted',
				data: categoryFor,
			}
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async editCategoryFor(dto: EditCategoryForDto): Promise<EditResponse> {
		try {
			const categoryFor = await this.categoryForRepository.upsert(dto)
			return {
				message: 'Success update!',
				data: categoryFor,
			}
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async getAllCategoriesFor(): Promise<CategoryFor[]> {
		return await this.categoryForRepository.findAll()
	}

	private async getCategoryForByName(name: string): Promise<CategoryFor> {
		return await this.categoryForRepository.findOne({ where: { name } })
	}
}
