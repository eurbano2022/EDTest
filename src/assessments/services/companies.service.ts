import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCompanyDto, UpdateCompanyDto } from '../dtos/company.dto';
import { Company } from '../entities/company.entity';

import { ProcessAreasService } from './process-areas.service';

@Injectable()
export class CompaniesService {
    constructor(
        @InjectRepository(Company)
        private companyRepo: Repository<Company>,
        private processAreasService: ProcessAreasService,
    ) {}

    findAll() {
        return this.companyRepo.find({});
    }

    async findOne(id: number) {
        const company = await this.companyRepo.findOne({ where: { id } });
        if (!company) {
            throw new NotFoundException(`Company #${id} not found`);
        }
        return company;
    }

    async create(data: CreateCompanyDto) {
        const newCompany = this.companyRepo.create(data);
        return this.companyRepo.save(newCompany);
    }

    async update(id: number, changes: UpdateCompanyDto) {
        const company = await this.companyRepo.findOne({ where: { id } });
        this.companyRepo.merge(company, changes);
        return this.companyRepo.save(company);
    }

    remove(id: number) {
        return this.companyRepo.delete(id);
    }
}
