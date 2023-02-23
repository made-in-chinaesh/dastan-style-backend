import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	UseGuards,
} from '@nestjs/common'
import { SizesService } from './sizes.service'
import { CreateSizeDto } from './dto/create-size.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Size } from './sizes.model'
import { DeleteResponse } from '../types/swagger'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../auth/roles-auth.decorator'

@ApiTags('Sizes')
@Controller('sizes')
export class SizesController {
	constructor(private sizesService: SizesService) {}

	@ApiOperation({ summary: 'Create size' })
	@ApiResponse({ status: 200, type: Size })
	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Post('/create')
	createSize(@Body() dto: CreateSizeDto) {
		return this.sizesService.createSize(dto)
	}

	@ApiOperation({ summary: 'Delete size' })
	@ApiResponse({ status: 200, type: DeleteResponse })
	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Delete('/:id')
	deleteSize(@Param('id') id: number) {
		return this.sizesService.deleteSize(id)
	}

	@ApiOperation({ summary: 'Get all sizes' })
	@ApiResponse({ status: 200, type: [Size] })
	@Get()
	getAllSizes() {
		return this.sizesService.getAllSizes()
	}
}
