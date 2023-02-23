import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'
import * as uuid from 'uuid'

export enum FileType {
	VIDEO = 'video',
	IMAGE = 'image',
}

@Injectable()
export class FilesService {
	async createFile(type: FileType, file, productId): Promise<string> {
		try {
			const fileExtension = file.originalname.split('.').pop()
			const fileName = `${uuid.v4()}.${fileExtension}`
			const filePath = path.resolve(__dirname, '..', 'static', type, productId)

			if (!fs.existsSync(filePath)) {
				fs.mkdirSync(filePath, {
					recursive: true,
				})
				fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)
			} else {
				fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)
			}

			return `${type}/${productId}/${fileName}`
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async removeFile(fileName: string) {
		try {
			const filePath = path.resolve(__dirname, '..', 'static', fileName)
			const isValidate = fs.existsSync(filePath)

			if (!isValidate) {
				throw new HttpException('Not found file', HttpStatus.NOT_FOUND)
			}

			fs.unlinkSync(filePath)

			return {
				message: 'Success delete',
			}
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}
}
