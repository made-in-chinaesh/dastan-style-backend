import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { ProductImages } from './product-images.model'
import { CreateProductImagesDto } from './dto/create-product-images.dto'
import { FilesService, FileType } from '../files/files.service'
import { AddResponse, DeleteResponse, EditResponse } from '../types/swagger'
import { DeleteProductImagesDto } from './dto/delete-product-images.dto'

@Injectable()
export class ProductImagesService {
	constructor(
		@InjectModel(ProductImages)
		private productImagesRepository: typeof ProductImages,
		private filesService: FilesService
	) {}

	async createProductImage(
		dto: CreateProductImagesDto
	): Promise<CreateProductImagesDto> {
		try {
			return await this.productImagesRepository.create(dto)
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async createProductImages(images: any[], productId) {
		for (let i = 0; i < images.length; i++) {
			const fileName = await this.filesService.createFile(
				FileType.IMAGE,
				images[i],
				productId
			)

			await this.createProductImage({
				productId,
				image: fileName,
			})
		}
	}

	async addProductImage(productId: number, image): Promise<AddResponse> {
		try {
			const fileName = await this.filesService.createFile(
				FileType.IMAGE,
				image,
				productId
			)
			const newImage = await this.productImagesRepository.create({
				productId,
				image: fileName,
			})
			return {
				message: 'Success added',
				data: newImage,
			}
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async deleteProductImage(
		dto: DeleteProductImagesDto
	): Promise<DeleteResponse> {
		try {
			const image = await this.productImagesRepository.destroy({
				where: { id: dto.id },
			})
			await this.filesService.removeFile(dto.fileName)

			return {
				message: 'Success delete',
				data: image,
			}
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async editProductImage(id: number, file): Promise<EditResponse> {
		try {
			const foundImage = await this.productImagesRepository.findByPk(id)

			if (!foundImage) {
				throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
			}

			await this.filesService.removeFile(foundImage.image)

			const newImage = await this.filesService.createFile(
				FileType.IMAGE,
				file,
				String(foundImage.productId)
			)

			foundImage.image = newImage

			await foundImage.save()

			return {
				message: 'Success edited',
				data: newImage,
			}
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}
}
