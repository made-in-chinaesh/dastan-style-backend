import { Module } from '@nestjs/common'
import { BasketsController } from './baskets.controller'
import { BasketsService } from './baskets.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { Basket } from './models/baskets.model'
import { BasketProducts } from './models/basket-products.model'

@Module({
	imports: [SequelizeModule.forFeature([Basket, BasketProducts])],
	controllers: [BasketsController],
	providers: [BasketsService],
	exports: [BasketsService],
})
export class BasketsModule {}
