import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateActivityDto, UpdateActivityDto } from '../dtos/activity.dto';
import { Activity } from '../entities/activity.entity';
import { Criteria } from '../entities/criteria.entity';

import { CriteriaService } from './criteria.service';

@Injectable()
export class ActivitiesService {
    constructor(
        @InjectRepository(Criteria)
        private activityRepo: Repository<Activity>,
        private criteriaService: CriteriaService,
    ) {}

    findAll() {
        return this.activityRepo.find({
            relations: ['level'],
        });
    }

    async findOne(id: number) {
        const activity = await this.activityRepo.findOne({ where: { id } });
        if (!activity) {
            throw new NotFoundException(`Criteria #${id} not found`);
        }
        return activity;
    }

    async create(data: CreateActivityDto) {
        const newCriteria = this.activityRepo.create(data);
        if (data.criteriaId) {
            const criteria = await this.criteriaService.findOne(
                data.criteriaId,
            );
            newCriteria.criteria = criteria;
        }
        return this.activityRepo.save(newCriteria);
    }

    async update(id: number, changes: UpdateActivityDto) {
        const activity = await this.activityRepo.findOne({ where: { id } });
        if (changes.criteriaId) {
            const criteria = await this.criteriaService.findOne(
                changes.criteriaId,
            );
            activity.criteria = criteria;
        }
        this.activityRepo.merge(activity, changes);
        return this.activityRepo.save(activity);
    }

    remove(id: number) {
        return this.activityRepo.delete(id);
    }
}
