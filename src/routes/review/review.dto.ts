import { createZodDto } from 'nestjs-zod'
import {
	CreateReviewBodySchema,
	CreateReviewResSchema,
	GetReviewDetailParamsSchema,
	GetReviewDetailResSchema,
	GetReviewParamSchema,
	GetReviewsParamsSchema,
	GetReviewsSchema,
	UpdateReviewBodySchema,
	UpdateReviewResSchema,
} from './review.model'

export class GetReviewsDTO extends createZodDto(GetReviewsSchema) {}
export class CreateReviewBodyDTO extends createZodDto(CreateReviewBodySchema) {}
export class CreateReviewResDTO extends createZodDto(CreateReviewResSchema) {}
export class UpdateReviewBodyDTO extends createZodDto(UpdateReviewBodySchema) {}
export class UpdateReviewResDTO extends createZodDto(UpdateReviewResSchema) {}
export class GetReviewsParamsDTO extends createZodDto(GetReviewsParamsSchema) {}
export class GetReviewDetailParamsDTO extends createZodDto(GetReviewDetailParamsSchema) {}
export class GetReviewDetailResDTO extends createZodDto(GetReviewDetailResSchema) {}
export class GetReviewParamDTO extends createZodDto(GetReviewParamSchema) {}
