import {
	Body,
	Controller,
	Delete,
	Param,
	Post,
	UseGuards,
} from '@nestjs/common'
import { ReviewsService } from './reviews.service'
import { CreateReviewDto } from './dto/create-review.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { DeleteResponse } from '../types/swagger'
import { ValidationPipe } from '../pipes/validation.pipe'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../auth/roles-auth.decorator'

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
	constructor(private reviewsService: ReviewsService) {}

	@ApiOperation({ summary: 'Create review' })
	@ApiResponse({ status: 200, type: CreateReviewDto })
	@Post('/create')
	createReview(@Body(new ValidationPipe()) dto: CreateReviewDto) {
		return this.reviewsService.createReview(dto)
	}

	@ApiOperation({ summary: 'Delete review' })
	@ApiResponse({ status: 200, type: DeleteResponse })
	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Delete('/delete/:id')
	deleteReview(@Param('id') id: number) {
		return this.reviewsService.deleteReview(id)
	}
}
