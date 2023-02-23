import { Module } from '@nestjs/common'
import { ProductImagesService } from './product-images.service'
import { ProductImagesController } from './product-images.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { ProductImages } from './product-images.model'
import { FilesModule } from '../files/files.module'
import { TokensModule } from '../tokens/tokens.module'

@Module({
	imports: [
		SequelizeModule.forFeature([ProductImages]),
		FilesModule,
		TokensModule,
	],
	providers: [ProductImagesService],
	controllers: [ProductImagesController],
	exports: [ProductImagesService],
})
export class ProductImagesModule {}
