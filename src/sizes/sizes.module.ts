import { Module } from '@nestjs/common'
import { SizesController } from './sizes.controller'
import { SizesService } from './sizes.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { Size } from './sizes.model'
import { ProductSizes } from '../products/models/product-sizes.model'
import { TokensModule } from '../tokens/tokens.module'

@Module({
	imports: [SequelizeModule.forFeature([Size, ProductSizes]), TokensModule],
	controllers: [SizesController],
	providers: [SizesService],
})
export class SizesModule {}
