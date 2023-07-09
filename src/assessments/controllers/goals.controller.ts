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

import { CreateGoalDto, UpdateGoalDto } from '../dtos/goal.dto';
import { GoalsService } from '../services/goals.service';

@ApiTags('Goals')
@Controller('goals')
export class GoalsController {
    constructor(private goalsService: GoalsService) {}

    @Get()
    @ApiOperation({ summary: 'List of goal' })
    getGoal() {
        return this.goalsService.findAll();
    }

    @Get(':goalId')
    getOne(@Param('goalId', ParseIntPipe) goalId: number) {
        return this.goalsService.findOne(goalId);
    }

    @Post()
    create(@Body() payload: CreateGoalDto) {
        return this.goalsService.create(payload);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateGoalDto,
    ) {
        return this.goalsService.update(id, payload);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.goalsService.remove(id);
    }
}
