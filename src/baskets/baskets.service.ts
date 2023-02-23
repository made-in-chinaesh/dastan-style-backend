import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Basket } from './models/baskets.model'
import { BasketProducts } from './models/basket-products.model'
import { CreateBasketDto } from './dto/create-basket.dto'
import { AddToBasketDto } from './dto/add-to-basket.dto'

@Injectable()
export class BasketsService {
	constructor(
		@InjectModel(Basket) private basketRepository: typeof Basket,
		@InjectModel(BasketProducts)
		private basketProductsRepository: typeof BasketProducts
	) {}

	async createBasket(userId): Promise<CreateBasketDto> {
		try {
			return await this.basketRepository.create({ userId })
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async addToBasket(dto: AddToBasketDto): Promise<AddToBasketDto> {
		try {
			const basketProduct = await this.basketProductsRepository.findOne({
				where: { basketId: dto.basketId, productId: dto.productId },
			})

			if (!basketProduct) {
				return this.basketProductsRepository.create(dto)
			}

			basketProduct.count = basketProduct.count += dto.count

			await basketProduct.save()

			return basketProduct
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async deleteProductBasket(id: number) {
		try {
			const basketProduct = await this.basketProductsRepository.destroy({
				where: { id },
			})
			return {
				message: 'Success deleted',
				data: basketProduct,
			}
		} catch (e) {}
	}

	async getUserBasket(id: number) {
		try {
			return await this.basketRepository.findByPk(id, {
				include: { all: true },
			})
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	private async getBasketProduct(id: number) {
		return await this.basketProductsRepository.findByPk(id)
	}
}
