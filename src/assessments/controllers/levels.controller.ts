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

import { CreateLevelDto, UpdateLevelDto } from '../dtos/level.dto';
import { LevelsService } from '../services/levels.service';

@ApiTags('Levels')
@Controller('levels')
export class LevelsController {
    constructor(private levelsService: LevelsService) {}

    @Get()
    @ApiOperation({ summary: 'List of levels' })
    getLevels() {
        return this.levelsService.findAll();
    }

    @Get(':levelId')
    getOne(@Param('levelId', ParseIntPipe) levelId: number) {
        return this.levelsService.findOne(levelId);
    }

    @Post()
    create(@Body() payload: CreateLevelDto) {
        return this.levelsService.create(payload);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateLevelDto,
    ) {
        return this.levelsService.update(id, payload);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.levelsService.remove(id);
    }
}
