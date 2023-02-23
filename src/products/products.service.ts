import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { ProductImagesService } from '../product-images/product-images.service'
import { ProductInfosService } from '../product-infos/product-infos.service'
import { DeleteResponse, EditResponse } from '../types/swagger'
import { filterProducts } from '../utils/filterProducts'
import { searchProducts } from '../utils/searchProducts'
import { CreateProductDto } from './dto/create-product.dto'
import { EditProductDto } from './dto/edit-product.dto'
import { ProductSizes } from './models/product-sizes.model'
import { Product } from './models/products.model'

@Injectable()
export class ProductsService {
	constructor(
		@InjectModel(Product) private productRepository: typeof Product,
		@InjectModel(ProductSizes)
		private productSizesRepository: typeof ProductSizes,
		private productInfosService: ProductInfosService,
		private productImagesService: ProductImagesService
	) {}

	async createProduct(dto: CreateProductDto, images): Promise<Product> {
		try {
			const foundProduct = await this.getProductByName(dto.name)

			if (foundProduct) {
				throw new HttpException(
					`This product with ${dto.name} is already exist`,
					HttpStatus.CREATED
				)
			}

			const product = await this.productRepository.create({
				name: dto.name,
				description: dto.description,
				price: Number(dto.price),
				categoryId: Number(dto.categoryId),
				categoryForId: Number(dto.categoryForId),
			})

			await this.createProductSizes(JSON.parse(dto.sizesId), product.id)
			await this.productImagesService.createProductImages(
				images,
				String(product.id)
			)
			await this.productInfosService.createProductInfos(
				JSON.parse(dto.info),
				product.id
			)
			return product
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async deleteProduct(id: number): Promise<DeleteResponse> {
		try {
			const product = await this.productRepository.destroy({
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

	async editProduct(dto: EditProductDto): Promise<EditResponse> {
		try {
			const product = await this.productRepository.upsert(dto)
			return {
				message: 'Success edited',
				data: product,
			}
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async getOneProduct(id: number): Promise<Product> {
		try {
			const product = await this.productRepository.findByPk(id)
			product.views = product.views += 1
			await product.save()
			return product
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async getAllProducts(
		page = 1,
		limit = 20,
		categoryForId: number,
		categories: string
	) {
		try {
			const offset = page * limit - limit

			const products = await this.productRepository.findAndCountAll({
				offset,
				limit,
				include: { all: true },
			})

			const queries = {
				categoryForId: Number(categoryForId),
				categories,
			}

			return filterProducts(queries, products)
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async searchProducts(query: string) {
		try {
			const products = await this.productRepository.findAll()
			return searchProducts(products, query)
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	private async createProductSizes(sizes, productId) {
		for (let i = 0; i < sizes.length; i++) {
			await this.productSizesRepository.create({
				sizeId: sizes[i],
				productId,
			})
		}
	}

	private async getProductByName(name: string): Promise<Product> {
		return await this.productRepository.findOne({ where: { name } })
	}
}
