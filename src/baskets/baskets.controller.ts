import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { BasketsService } from './baskets.service'
import { CreateBasketDto } from './dto/create-basket.dto'
import { AddToBasketDto } from './dto/add-to-basket.dto'
import { ValidationPipe } from '../pipes/validation.pipe'
import { DeleteResponse } from '../types/swagger'
import { BasketProducts } from './models/basket-products.model'

@ApiTags('Baskets')
@Controller('baskets')
export class BasketsController {
	constructor(private basketService: BasketsService) {}

	@ApiOperation({ summary: 'Create basket' })
	@ApiResponse({ status: 200, type: CreateBasketDto })
	@Post('/create')
	createBasket(@Body(new ValidationPipe()) dto: CreateBasketDto) {
		return this.basketService.createBasket(dto.userId)
	}

	@ApiOperation({ summary: 'User basket' })
	@ApiResponse({ status: 200, type: BasketProducts })
	@Get('/:id')
	getUserBasket(@Param('id') id: number) {
		return this.basketService.getUserBasket(id)
	}

	@ApiOperation({ summary: 'Create basket' })
	@ApiResponse({ status: 200, type: CreateBasketDto })
	@Post('/add')
	addToBasket(@Body(new ValidationPipe()) dto: AddToBasketDto) {
		return this.basketService.addToBasket(dto)
	}

	@ApiOperation({ summary: 'Create basket' })
	@ApiResponse({ status: 200, type: DeleteResponse })
	@Delete('/delete/:id')
	deleteBasketProduct(@Param('id') id: number) {
		return this.basketService.deleteProductBasket(id)
	}
}
