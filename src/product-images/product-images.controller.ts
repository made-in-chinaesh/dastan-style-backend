import {
	Body,
	Controller,
	Delete,
	Param,
	Post,
	Put,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ValidationPipe } from '../pipes/validation.pipe'
import { ProductImagesService } from './product-images.service'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../auth/roles-auth.decorator'
import { DeleteProductImagesDto } from './dto/delete-product-images.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { AddResponse, DeleteResponse, EditResponse } from '../types/swagger'
import { CreateProductImagesDto } from './dto/create-product-images.dto'

@ApiTags('product-images')
@Controller('product-images')
export class ProductImagesController {
	constructor(private productImagesService: ProductImagesService) {}

	@ApiOperation({ summary: 'Create product-image' })
	@ApiResponse({ status: 200, type: CreateProductImagesDto })
	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Post('/create')
	createProductImage(@Body(new ValidationPipe()) dto: CreateProductImagesDto) {
		return this.productImagesService.createProductImage(dto)
	}

	@ApiOperation({ summary: 'Add product-image' })
	@ApiResponse({ status: 200, type: AddResponse })
	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Post('/add/:productId')
	@UseInterceptors(FileInterceptor('image'))
	addProductImage(
		@Param('productId') productId: number,
		@UploadedFile() image
	) {
		return this.productImagesService.addProductImage(productId, image)
	}

	@ApiOperation({ summary: 'Delete product-image' })
	@ApiResponse({ status: 200, type: DeleteResponse })
	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Delete('/delete')
	deleteProductImage(@Body(new ValidationPipe()) dto: DeleteProductImagesDto) {
		return this.productImagesService.deleteProductImage(dto)
	}
	@ApiOperation({ summary: 'Edit product-image' })
	@ApiResponse({ status: 200, type: EditResponse })
	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Put('/edit/:id')
	@UseInterceptors(FileInterceptor('image'))
	editProductImage(@Param('id') id: number, @UploadedFile() image) {
		return this.productImagesService.editProductImage(id, image)
	}
}
