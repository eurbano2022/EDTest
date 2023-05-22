import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProcessArea } from '../entities/process-area.entity';
import { CreateProcessAreaDto, UpdateProcessAreaDto } from '../dtos/process-area.dto';
import { LevelsService } from './levels.service';
import { CreateCriteriaDto, UpdateCriteriaDto } from '../dtos/criteria.dto';
import { ProcessAreasService } from './process-areas.service';
import { Criteria } from '../entities/criteria.entity';


@Injectable()
export class CriteriaService {
    constructor(
        @InjectRepository(ProcessArea)
        private criteriaRepo: Repository<Criteria>,
        private processAreaService: ProcessAreasService,
    ) {}

    findAll() {
        return this.criteriaRepo.find({
            relations:['level']
        });
    }

    async findOne(id: number) {
        const criteria = await this.criteriaRepo.findOne({ where: { id } });
        if (!criteria) {
            throw new NotFoundException(`ProcessArea #${id} not found`);
        }
        return criteria;
    }

    async create(data: CreateCriteriaDto) {
        const newProcessArea = this.criteriaRepo.create(data);
        if (data.processAreaId) {
            const processArea = await this.processAreaService.findOne(data.processAreaId);
            newProcessArea.processArea = processArea;
        }
        return this.criteriaRepo.save(newProcessArea);
    }

    async update(id: number, changes: UpdateCriteriaDto) {
        const criteria = await this.criteriaRepo.findOne({ where: { id } });
        if (changes.processAreaId) {
            const processArea = await this.processAreaService.findOne(changes.processAreaId);
            criteria.processArea = processArea;
        }
        this.criteriaRepo.merge(criteria, changes);
        return this.criteriaRepo.save(criteria);
    }

    remove(id: number) {
        return this.criteriaRepo.delete(id);
    }
}
