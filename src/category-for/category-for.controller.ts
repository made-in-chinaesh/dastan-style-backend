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
import { CategoryForService } from './category-for.service'
import { CreateCategoryForDto } from './dto/create-category-for.dto'
import { EditCategoryForDto } from './dto/edit-category-for.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CategoryFor } from './category-for.model'
import { DeleteResponse, EditResponse } from '../types/swagger'
import { ValidationPipe } from '../pipes/validation.pipe'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../auth/roles-auth.decorator'

@ApiTags('Category-for')
@Controller('category-for')
export class CategoryForController {
	constructor(private categoryForService: CategoryForService) {}

	@ApiOperation({ summary: 'Create category-for' })
	@ApiResponse({ status: 200, type: CategoryFor })
	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Post('/create')
	createCategoryFor(@Body(new ValidationPipe()) dto: CreateCategoryForDto) {
		return this.categoryForService.createCategoryFor(dto)
	}

	@ApiOperation({ summary: 'Delete category-for' })
	@ApiResponse({ status: 200, type: DeleteResponse })
	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Delete('/delete/:id')
	deleteCategory(@Param('id') id: number) {
		return this.categoryForService.deleteCategoryFor(id)
	}

	@ApiOperation({ summary: 'Edit category-for' })
	@ApiResponse({ status: 200, type: EditResponse })
	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Put('/edit')
	editCategory(@Body(new ValidationPipe()) dto: EditCategoryForDto) {
		return this.categoryForService.editCategoryFor(dto)
	}

	@ApiOperation({ summary: 'Get all category-for' })
	@ApiResponse({ status: 200, type: [CategoryFor] })
	@Get()
	getAllCategoriesFor() {
		return this.categoryForService.getAllCategoriesFor()
	}
}
