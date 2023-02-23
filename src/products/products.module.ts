import { Module } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Product } from './models/products.model'
import { ProductSizes } from './models/product-sizes.model'
import { ProductInfo } from '../product-infos/product-info.model'
import { ProductInfosModule } from '../product-infos/product-infos.module'
import { TokensModule } from '../tokens/tokens.module'
import { FilesModule } from '../files/files.module'
import { ProductImagesModule } from '../product-images/product-images.module'

@Module({
	imports: [
		SequelizeModule.forFeature([Product, ProductSizes, ProductInfo]),
		ProductInfosModule,
		TokensModule,
		FilesModule,
		ProductImagesModule,
	],
	providers: [ProductsService],
	controllers: [ProductsController],
})
export class ProductsModule {}
