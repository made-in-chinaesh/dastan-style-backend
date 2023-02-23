import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { EditCategoryDto } from './dto/edit-category.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Category } from './categories.model'
import { DeleteResponse, EditResponse } from '../types/swagger'
import { ValidationPipe } from '../pipes/validation.pipe'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../auth/roles-auth.decorator'

@ApiTags('CategoriesList')
@Controller('categories')
export class CategoriesController {
	constructor(private categoriesService: CategoriesService) {}

	@ApiOperation({ summary: 'Create category' })
	@ApiResponse({ status: 200, type: Category })
	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Post('/create')
	createCategory(@Body(new ValidationPipe()) dto: CreateCategoryDto) {
		return this.categoriesService.createCategory(dto)
	}

	@ApiOperation({ summary: 'Delete category' })
	@ApiResponse({ status: 200, type: DeleteResponse })
	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Delete('/delete/:id')
	deleteCategory(@Param('id') id: number) {
		return this.categoriesService.deleteCategory(id)
	}

	@ApiOperation({ summary: 'Edit category' })
	@ApiResponse({ status: 200, type: EditResponse })
	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Put('/edit')
	editCategory(@Body(new ValidationPipe()) dto: EditCategoryDto) {
		return this.categoriesService.editCategory(dto)
	}

	@ApiOperation({ summary: 'Get all categories' })
	@ApiResponse({ status: 200, type: [Category] })
	@Get()
	getAllCategories() {
		return this.categoriesService.getAllCategories()
	}
}
