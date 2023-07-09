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

import { CreateCompanyDto, UpdateCompanyDto } from '../dtos/company.dto';
import { CompaniesService } from '../services/companies.service';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
    constructor(private companiesService: CompaniesService) {}

    @Get()
    @ApiOperation({ summary: 'List of company' })
    getCompany() {
        return this.companiesService.findAll();
    }

    @Get(':companyId')
    getOne(@Param('companyId', ParseIntPipe) companyId: number) {
        return this.companiesService.findOne(companyId);
    }

    @Post()
    create(@Body() payload: CreateCompanyDto) {
        return this.companiesService.create(payload);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateCompanyDto,
    ) {
        return this.companiesService.update(id, payload);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.companiesService.remove(id);
    }
}
