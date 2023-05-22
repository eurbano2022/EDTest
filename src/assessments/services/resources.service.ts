import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateResourceDto, UpdateResourceDto } from '../dtos/resource.dto';
import { Criteria } from '../entities/criteria.entity';
import { Resource } from '../entities/resource.entity';

import { CriteriaService } from './criteria.service';

@Injectable()
export class ResourcesService {
    constructor(
        @InjectRepository(Criteria)
        private resourceRepo: Repository<Resource>,
        private criteriaService: CriteriaService,
    ) {}

    findAll() {
        return this.resourceRepo.find({
            relations: ['level'],
        });
    }

    async findOne(id: number) {
        const resource = await this.resourceRepo.findOne({ where: { id } });
        if (!resource) {
            throw new NotFoundException(`Criteria #${id} not found`);
        }
        return resource;
    }

    async create(data: CreateResourceDto) {
        const newCriteria = this.resourceRepo.create(data);
        if (data.criteriaId) {
            const criteria = await this.criteriaService.findOne(
                data.criteriaId,
            );
            newCriteria.criteria = criteria;
        }
        return this.resourceRepo.save(newCriteria);
    }

    async update(id: number, changes: UpdateResourceDto) {
        const resource = await this.resourceRepo.findOne({ where: { id } });
        if (changes.criteriaId) {
            const criteria = await this.criteriaService.findOne(
                changes.criteriaId,
            );
            resource.criteria = criteria;
        }
        this.resourceRepo.merge(resource, changes);
        return this.resourceRepo.save(resource);
    }

    remove(id: number) {
        return this.resourceRepo.delete(id);
    }
}
