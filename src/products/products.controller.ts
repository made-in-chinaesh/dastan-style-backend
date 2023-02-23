import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../auth/roles-auth.decorator'
import { ValidationPipe } from '../pipes/validation.pipe'
import { DeleteResponse, EditResponse } from '../types/swagger'
import { CreateProductDto } from './dto/create-product.dto'
import { EditProductDto } from './dto/edit-product.dto'
import { Product } from './models/products.model'
import { ProductsService } from './products.service'

@ApiTags('Products')
@Controller('products')
export class ProductsController {
	constructor(private productsService: ProductsService) {}

	@ApiOperation({ summary: 'Create product' })
	@ApiResponse({ status: 200, type: Product })
	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Post('/create')
	@UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 10 }]))
	createProduct(
		@Body(new ValidationPipe()) dto: CreateProductDto,
		@UploadedFiles() files
	) {
		const { images } = files
		return this.productsService.createProduct(dto, images)
	}

	@ApiOperation({ summary: 'Delete product' })
	@ApiResponse({ status: 200, type: DeleteResponse })
	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Delete('/:id')
	deleteProduct(@Param('id') id: number) {
		return this.productsService.deleteProduct(id)
	}

	@ApiOperation({ summary: 'Edit product' })
	@ApiResponse({ status: 200, type: EditResponse })
	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Put('/edit')
	editProduct(@Body(new ValidationPipe()) dto: EditProductDto) {
		return this.productsService.editProduct(dto)
	}

	@ApiOperation({ summary: 'Get one product' })
	@ApiResponse({ status: 200, type: Product })
	@Get('/get_one/:id')
	getOneProduct(@Param('id') id: number) {
		return this.productsService.getOneProduct(id)
	}

	@ApiOperation({ summary: 'Get all products' })
	@ApiResponse({ status: 200, type: [Product] })
	@Get()
	getAllProducts(
		@Query('categories') categories: string,
		@Query('categoryForId') categoryForId: number,
		@Query('page') page: number,
		@Query('limit') limit: number
	) {
		return this.productsService.getAllProducts(
			page,
			limit,
			categoryForId,
			categories
		)
	}

	@ApiOperation({ summary: 'Search products' })
	@ApiResponse({ status: 200, type: [Product] })
	@Get('/search')
	searchProducts(@Query('query') query: string) {
		return this.productsService.searchProducts(query)
	}
}
