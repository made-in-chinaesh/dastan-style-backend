import { Module } from '@nestjs/common'
import { ProductInfosService } from './product-infos.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { ProductInfo } from './product-info.model'
import { ProductInfosController } from './product-infos.controller'
import { TokensModule } from '../tokens/tokens.module'

@Module({
	imports: [SequelizeModule.forFeature([ProductInfo]), TokensModule],
	controllers: [ProductInfosController],
	providers: [ProductInfosService],
	exports: [ProductInfosService],
})
export class ProductInfosModule {}
