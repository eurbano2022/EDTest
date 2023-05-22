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

import {
    CreateProcessAreaDto,
    UpdateProcessAreaDto,
} from '../dtos/process-area.dto';
import { ProcessAreasService } from '../services/process-areas.service';

@ApiTags('processAreas')
@Controller('processAreas')
export class ProcessAreasController {
    constructor(private processAreasService: ProcessAreasService) {}

    @Get()
    @ApiOperation({ summary: 'List of processAreas' })
    getProcessAreas() {
        return this.processAreasService.findAll();
    }

    @Get(':processAreaId')
    getOne(@Param('processAreaId', ParseIntPipe) processAreaId: number) {
        return this.processAreasService.findOne(processAreaId);
    }

    @Post()
    create(@Body() payload: CreateProcessAreaDto) {
        return this.processAreasService.create(payload);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateProcessAreaDto,
    ) {
        return this.processAreasService.update(id, payload);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.processAreasService.remove(id);
    }
}
