import { Module } from '@nestjs/common'
import { ReviewsService } from './reviews.service'
import { ReviewsController } from './reviews.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Review } from './models/reviews.model'
import { TokensModule } from '../tokens/tokens.module'

@Module({
	imports: [SequelizeModule.forFeature([Review]), TokensModule],
	providers: [ReviewsService],
	controllers: [ReviewsController],
})
export class ReviewsModule {}
