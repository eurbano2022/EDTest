import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateGoalDto, UpdateGoalDto } from '../dtos/goal.dto';
import { Goal } from '../entities/goal.entity';

import { CriteriaService } from './criteria.service';

@Injectable()
export class GoalsService {
    constructor(
        @InjectRepository(Goal)
        private goalRepo: Repository<Goal>,
        private criteriaService: CriteriaService,
    ) {}

    findAll() {
        return this.goalRepo.find({
            relations: ['processArea', 'parent'],
        });
    }

    async findOne(id: number) {
        const goal = await this.goalRepo.findOne({ where: { id } });
        if (!goal) {
            throw new NotFoundException(`Goal #${id} not found`);
        }
        return goal;
    }

    async create(data: CreateGoalDto) {
        const newGoal = this.goalRepo.create(data);
        if (data.criteriaIds) {
            const criteria = await this.criteriaService.findByIds(
                data.criteriaIds,
            );
            newGoal.criteria = criteria;
        }
        return this.goalRepo.save(newGoal);
    }

    async update(id: number, changes: UpdateGoalDto) {
        const goal = await this.goalRepo.findOne({ where: { id } });
        if (changes.criteriaIds) {
            const criteria = await this.criteriaService.findByIds(
                changes.criteriaIds,
            );
            goal.criteria = criteria;
        }
        this.goalRepo.merge(goal, changes);
        return this.goalRepo.save(goal);
    }

    remove(id: number) {
        return this.goalRepo.delete(id);
    }
}
