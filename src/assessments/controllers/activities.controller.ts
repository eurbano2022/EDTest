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

import { CreateActivityDto, UpdateActivityDto } from '../dtos/activity.dto';
import { ActivitiesService } from '../services/activities.service';

@ApiTags('Activities')
@Controller('activity')
export class ActivitiesController {
    constructor(private activityService: ActivitiesService) {}

    @Get()
    @ApiOperation({ summary: 'List of activity' })
    getActivity() {
        return this.activityService.findAll();
    }

    @Get(':processAreaId')
    getOne(@Param('processAreaId', ParseIntPipe) processAreaId: number) {
        return this.activityService.findOne(processAreaId);
    }

    @Post()
    create(@Body() payload: CreateActivityDto) {
        return this.activityService.create(payload);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateActivityDto,
    ) {
        return this.activityService.update(id, payload);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.activityService.remove(id);
    }
}
