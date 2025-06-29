import { Injectable } from '@nestjs/common'
import { CreateReviewBodyType, GetReviewParamType, UpdateReviewBodyType } from 'src/routes/review/review.model'
import { ReviewRepository } from 'src/routes/review/review.repo'
import { PaginationQueryType } from 'src/shared/models/request.model'

@Injectable()
export class ReviewService {
	constructor(private readonly reviewRepository: ReviewRepository) {}

	list(productId: number, pagination: PaginationQueryType) {
		return this.reviewRepository.list(productId, pagination)
	}

	async getDetail(params: GetReviewParamType) {
		const result = await this.reviewRepository.getDetail(params)
		if (result) {
			return result
		}
	}

	async create(userId: number, body: CreateReviewBodyType) {
		return this.reviewRepository.create(userId, body)
	}

	async update({ userId, reviewId, body }: { userId: number; reviewId: number; body: UpdateReviewBodyType }) {
		return this.reviewRepository.update({
			userId,
			reviewId,
			body,
		})
	}
}
