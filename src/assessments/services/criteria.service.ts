import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCriteriaDto, UpdateCriteriaDto } from '../dtos/criteria.dto';
import { Criteria } from '../entities/criteria.entity';

import { ProcessAreasService } from './process-areas.service';

@Injectable()
export class CriteriaService {
    constructor(
        @InjectRepository(Criteria)
        private criteriaRepo: Repository<Criteria>,
        private processAreasService: ProcessAreasService,
    ) {}

    findAll() {
        return this.criteriaRepo.find({
            relations: ['processArea', 'parent'],
        });
    }

    async findOne(id: number) {
        const criteria = await this.criteriaRepo.findOne({ where: { id } });
        if (!criteria) {
            throw new NotFoundException(`Criteria #${id} not found`);
        }
        return criteria;
    }

    async create(data: CreateCriteriaDto) {
        const newCriteria = this.criteriaRepo.create(data);
        if (data.processAreaId) {
            const processArea = await this.processAreasService.findOne(
                data.processAreaId,
            );
            newCriteria.processArea = processArea;
        }
        if (data.parentId) {
            const criteria = await this.criteriaRepo.findOne({
                where: { id: data.parentId },
            });
            newCriteria.parent = criteria;
        }
        return this.criteriaRepo.save(newCriteria);
    }

    async update(id: number, changes: UpdateCriteriaDto) {
        const criteria = await this.criteriaRepo.findOne({ where: { id } });
        if (changes.processAreaId) {
            const processArea = await this.processAreasService.findOne(
                changes.processAreaId,
            );
            criteria.processArea = processArea;
        }
        if (changes.parentId) {
            const criteria = await this.criteriaRepo.findOne({
                where: { id: changes.parentId },
            });
            criteria.parent = criteria;
        }
        this.criteriaRepo.merge(criteria, changes);
        return this.criteriaRepo.save(criteria);
    }

    remove(id: number) {
        return this.criteriaRepo.delete(id);
    }
}
