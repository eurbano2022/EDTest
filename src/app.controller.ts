import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppService, responseMutant } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @ApiTags('Mutant Validation')
    @Post()
    async isMutant(@Body() dna: string[]): Promise<responseMutant> {
        return await this.appService.isMutant(dna);
    }

    @ApiTags('Hello World')
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
