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

import { CreateResourceDto, UpdateResourceDto } from '../dtos/resource.dto';
import { ResourcesService } from '../services/resources.service';

@ApiTags('resource')
@Controller('resource')
export class ResourcesController {
    constructor(private resourceService: ResourcesService) {}

    @Get()
    @ApiOperation({ summary: 'List of resource' })
    getResource() {
        return this.resourceService.findAll();
    }

    @Get(':processAreaId')
    getOne(@Param('processAreaId', ParseIntPipe) processAreaId: number) {
        return this.resourceService.findOne(processAreaId);
    }

    @Post()
    create(@Body() payload: CreateResourceDto) {
        return this.resourceService.create(payload);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateResourceDto,
    ) {
        return this.resourceService.update(id, payload);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.resourceService.remove(id);
    }
}
