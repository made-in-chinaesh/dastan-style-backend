import { Module } from '@nestjs/common'
import { CategoryForService } from './category-for.service'
import { CategoryForController } from './category-for.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { CategoryFor } from './category-for.model'
import { TokensModule } from '../tokens/tokens.module'

@Module({
	imports: [SequelizeModule.forFeature([CategoryFor]), TokensModule],
	providers: [CategoryForService],
	controllers: [CategoryForController],
})
export class CategoryForModule {}
