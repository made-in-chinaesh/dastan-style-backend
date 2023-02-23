import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateSizeDto } from './dto/create-size.dto'
import { Size } from './sizes.model'

@Injectable()
export class SizesService {
	constructor(@InjectModel(Size) private sizeRepository: typeof Size) {}

	async createSize(dto: CreateSizeDto): Promise<Size> {
		try {
			const size = await this.validateSize(dto.size)

			if (size) {
				throw new HttpException(
					'This size is already exist!',
					HttpStatus.CREATED
				)
			}

			return await this.sizeRepository.create(dto)
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async deleteSize(id: number): Promise<any> {
		try {
			const size = await this.sizeRepository.destroy({ where: { id } })

			return {
				message: 'Success deleted!',
				data: size,
			}
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async getAllSizes(): Promise<Size[]> {
		return await this.sizeRepository.findAll()
	}

	private async validateSize(size: string): Promise<Size> {
		return await this.sizeRepository.findOne({ where: { size } })
	}
}
