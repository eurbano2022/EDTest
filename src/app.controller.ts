import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';

import { AppService, responseMutant } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @ApiTags('Mutant Validation')
    @Post()
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                dna: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                },
            },
            example: {
                dna: [
                    'ATGCGA',
                    'CAGTGC',
                    'TTATGT',
                    'AGAAGG',
                    'CCCCTA',
                    'TCACTG',
                ],
            },
        },
    })
    async isMutant(@Body() body: { dna: string[] }): Promise<responseMutant> {
        const { dna } = body;
        return await this.appService.isMutant(dna);
    }

    @ApiTags('Hello World')
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
