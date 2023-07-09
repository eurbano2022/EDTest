import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateGoalDto, UpdateGoalDto } from '../dtos/goal.dto';
import { Criteria } from '../entities/criteria.entity';
import { Goal } from '../entities/goal.entity';

@Injectable()
export class GoalsService {
    constructor(
        @InjectRepository(Goal)
        private goalRepo: Repository<Goal>,
        private criteriaRepo: Repository<Criteria>,
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
            const criteria = await this.criteriaRepo.findByIds(
                data.criteriaIds,
            );
            newGoal.criterias = criteria;
        }
        return this.goalRepo.save(newGoal);
    }

    async update(id: number, changes: UpdateGoalDto) {
        const goal = await this.goalRepo.findOne({ where: { id } });
        if (changes.criteriaIds) {
            const criteria = await this.criteriaRepo.findByIds(
                changes.criteriaIds,
            );
            goal.criterias = criteria;
        }
        this.goalRepo.merge(goal, changes);
        return this.goalRepo.save(goal);
    }

    remove(id: number) {
        return this.goalRepo.delete(id);
    }
}
