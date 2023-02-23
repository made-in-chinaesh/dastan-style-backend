import { Module } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CategoriesController } from './categories.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Category } from './categories.model'
import { TokensModule } from '../tokens/tokens.module'

@Module({
	imports: [SequelizeModule.forFeature([Category]), TokensModule],
	providers: [CategoriesService],
	controllers: [CategoriesController],
})
export class CategoriesModule {}
