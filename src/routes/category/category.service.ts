import { Injectable } from '@nestjs/common'
import { CategoryRepo } from 'src/routes/category/category.repo'
import { CreateCategoryBodyType, UpdateCategoryBodyType } from 'src/routes/category/category.model'
import { NotFoundRecordException } from 'src/shared/error'
import { isNotFoundPrismaError } from 'src/shared/helpers'

@Injectable()
export class CategoryService {
	constructor(private categoryRepo: CategoryRepo) {}

	findAll(parentCategoryId?: number | null) {
		return this.categoryRepo.findAll(parentCategoryId)
	}

	async findById(id: number) {
		const category = await this.categoryRepo.findById(id)
		if (!category) {
			throw NotFoundRecordException
		}
		return category
	}

	create({ data, createdById }: { data: CreateCategoryBodyType; createdById: number }) {
		return this.categoryRepo.create({
			createdById,
			data,
		})
	}

	async update({ id, data, updatedById }: { id: number; data: UpdateCategoryBodyType; updatedById: number }) {
		try {
			const category = await this.categoryRepo.update({
				id,
				updatedById,
				data,
			})
			return category
		} catch (error) {
			if (isNotFoundPrismaError(error)) {
				throw NotFoundRecordException
			}
			throw error
		}
	}

	async delete({ id, deletedById }: { id: number; deletedById: number }) {
		try {
			await this.categoryRepo.delete({
				id,
				deletedById,
				isHard: true,
			})
			return {
				message: 'Delete successfully',
			}
		} catch (error) {
			if (isNotFoundPrismaError(error)) {
				throw NotFoundRecordException
			}
			throw error
		}
	}
}
