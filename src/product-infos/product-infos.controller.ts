import {
	Body,
	Controller,
	Delete,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common'
import { ProductInfosService } from './product-infos.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateProductInfoDto } from './dto/create-product-info.dto'
import { ValidationPipe } from '../pipes/validation.pipe'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../auth/roles-auth.decorator'
import { EditProductInfoDto } from './dto/edit-product-info.dto'
import { DeleteResponse, EditResponse } from '../types/swagger'

@ApiTags('Product-infos')
@Controller('product-infos')
export class ProductInfosController {
	constructor(private productInfosService: ProductInfosService) {}

	@ApiOperation({ summary: 'Create product-info' })
	@ApiResponse({ status: 200, type: CreateProductInfoDto })
	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Post('/create')
	createProductInfo(@Body(new ValidationPipe()) dto: CreateProductInfoDto) {
		return this.productInfosService.createProductInfo(dto)
	}

	@ApiOperation({ summary: 'Delete product-info' })
	@ApiResponse({ status: 200, type: DeleteResponse })
	@Delete('/delete/:id')
	deleteProductInfo(@Param('id') id: number) {
		return this.productInfosService.deleteProductInfo(id)
	}

	@ApiOperation({ summary: 'Edit product-info' })
	@ApiResponse({ status: 200, type: EditResponse })
	@Put('/edit')
	editProductInfo(@Body() dto: EditProductInfoDto) {
		return this.productInfosService.editProductInfo(dto)
	}
}
