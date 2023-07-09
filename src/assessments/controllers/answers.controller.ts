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

import { CreateAnswerDto, UpdateAnswerDto } from '../dtos/answer.dto';
import { AnswersService } from '../services/answers.service';

@ApiTags('Answers')
@Controller('answers')
export class AnswersController {
    constructor(private answersService: AnswersService) {}

    @Get()
    @ApiOperation({ summary: 'List of answer' })
    getAnswer() {
        return this.answersService.findAll();
    }

    @Get(':answerId')
    getOne(@Param('answerId', ParseIntPipe) answerId: number) {
        return this.answersService.findOne(answerId);
    }

    @Post()
    create(@Body() payload: CreateAnswerDto) {
        return this.answersService.create(payload);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateAnswerDto,
    ) {
        return this.answersService.update(id, payload);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.answersService.remove(id);
    }
}
