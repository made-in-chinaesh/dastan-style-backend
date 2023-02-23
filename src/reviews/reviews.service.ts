import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Review } from './models/reviews.model'
import { CreateReviewDto } from './dto/create-review.dto'
import { DeleteResponse } from '../types/swagger'

@Injectable()
export class ReviewsService {
	constructor(@InjectModel(Review) private reviewRepository: typeof Review) {}

	async createReview(dto: CreateReviewDto): Promise<CreateReviewDto> {
		try {
			return await this.reviewRepository.create(dto)
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async deleteReview(id: number): Promise<DeleteResponse> {
		try {
			const review = await this.reviewRepository.destroy({ where: { id } })
			return {
				message: 'Success deleted',
				data: review,
			}
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}
}
