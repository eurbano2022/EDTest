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

import { CreatePracticeDto, UpdatePracticeDto } from '../dtos/practice.dto';
import { PracticesService } from '../services/practices.service';

@ApiTags('Practices')
@Controller('practices')
export class PracticesController {
    constructor(private practicesService: PracticesService) {}

    @Get()
    @ApiOperation({ summary: 'List of practice' })
    getPractice() {
        return this.practicesService.findAll();
    }

    @Get(':practiceId')
    getOne(@Param('practiceId', ParseIntPipe) practiceId: number) {
        return this.practicesService.findOne(practiceId);
    }

    @Post()
    create(@Body() payload: CreatePracticeDto) {
        return this.practicesService.create(payload);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdatePracticeDto,
    ) {
        return this.practicesService.update(id, payload);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.practicesService.remove(id);
    }
}
