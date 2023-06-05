import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateCriteriaDto, UpdateCriteriaDto } from '../dtos/criteria.dto';
import { CriteriaService } from '../services/criteria.service';

@ApiTags('Criteria')
@Controller('criteria')
export class CriteriaController {
    constructor(private criteriaService: CriteriaService) {}

    @Get()
    @ApiOperation({ summary: 'List of criteria' })
    getCriteria() {
        return this.criteriaService.findAll();
    }

    @Get(':criteriaId')
    getOne(@Param('criteriaId', ParseIntPipe) criteriaId: number) {
        return this.criteriaService.findOne(criteriaId);
    }

    @Post()
    create(@Body() payload: CreateCriteriaDto) {
        return this.criteriaService.create(payload);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateCriteriaDto,
    ) {
        return this.criteriaService.update(id, payload);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.criteriaService.remove(id);
    }
}
