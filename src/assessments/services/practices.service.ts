import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePracticeDto, UpdatePracticeDto } from '../dtos/practice.dto';
import { Practice } from '../entities/practice.entity';

import { GoalsService } from './goals.service';

@Injectable()
export class PracticesService {
    constructor(
        @InjectRepository(Practice)
        private practiceRepo: Repository<Practice>,
        private goalsService: GoalsService,
    ) {}

    findAll() {
        return this.practiceRepo.find({
            relations: ['processArea', 'parent'],
        });
    }

    async findOne(id: number) {
        const practice = await this.practiceRepo.findOne({ where: { id } });
        if (!practice) {
            throw new NotFoundException(`Practice #${id} not found`);
        }
        return practice;
    }

    async create(data: CreatePracticeDto) {
        const newPractice = this.practiceRepo.create(data);
        if (data.goalId) {
            const goal = await this.goalsService.findOne(data.goalId);
            newPractice.goal = goal;
        }
        return this.practiceRepo.save(newPractice);
    }

    async update(id: number, changes: UpdatePracticeDto) {
        const practice = await this.practiceRepo.findOne({ where: { id } });
        if (changes.goalId) {
            const goal = await this.goalsService.findOne(changes.goalId);
            practice.goal = goal;
        }
        this.practiceRepo.merge(practice, changes);
        return this.practiceRepo.save(practice);
    }

    remove(id: number) {
        return this.practiceRepo.delete(id);
    }
}
