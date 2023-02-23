import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { ProductInfo } from './product-info.model'
import { CreateProductInfoDto } from './dto/create-product-info.dto'
import { DeleteResponse, EditResponse } from '../types/swagger'
import { EditProductInfoDto } from './dto/edit-product-info.dto'

@Injectable()
export class ProductInfosService {
	constructor(
		@InjectModel(ProductInfo) private productInfoRepository: typeof ProductInfo
	) {}

	async createProductInfo(dto: CreateProductInfoDto): Promise<ProductInfo> {
		try {
			return await this.productInfoRepository.create(dto)
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async createProductInfos(info: any[], productId: number) {
		try {
			for (let i = 0; i < info.length; i++) {
				await this.createProductInfo({
					title: info[i].title,
					description: info[i].description,
					productId,
				})
			}
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async deleteProductInfo(id: number): Promise<DeleteResponse> {
		try {
			const product = await this.productInfoRepository.destroy({
				where: { id },
			})
			return {
				message: 'Success deleted',
				data: product,
			}
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async editProductInfo(dto: EditProductInfoDto): Promise<EditResponse> {
		try {
			const product = await this.productInfoRepository.upsert(dto)
			return {
				message: 'Success edited',
				data: product,
			}
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}
}
