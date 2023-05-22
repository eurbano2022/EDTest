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
import { CriteriaService } from '../services/criteria.service';
import { CreateCriteriaDto, UpdateCriteriaDto } from '../dtos/criteria.dto';


@ApiTags('criteria')
@Controller('criteria')
export class CriteriaController {
    constructor(private criteriaService: CriteriaService) {}

    @Get()
    @ApiOperation({ summary: 'List of criteria' })
    getCriteria() {
        return this.criteriaService.findAll();
    }

    @Get(':processAreaId')
    getOne(@Param('processAreaId', ParseIntPipe) processAreaId: number) {
        return this.criteriaService.findOne(processAreaId);
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
