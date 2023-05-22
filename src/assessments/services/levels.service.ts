import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateLevelDto, UpdateLevelDto } from '../dtos/level.dto';
import { Level } from '../entities/level.entity';

@Injectable()
export class LevelsService {
    constructor(
        @InjectRepository(Level) private levelRepo: Repository<Level>,
    ) {}

    findAll() {
        return this.levelRepo.find();
    }

    async findOne(id: number) {
        const level = await this.levelRepo.findOne({
            where: { id },
            relations: ['processAreas'],
        });
        if (!level) {
            throw new NotFoundException(`Level #${id} not found`);
        }
        return level;
    }

    create(data: CreateLevelDto) {
        const newLevel = this.levelRepo.create(data);
        return this.levelRepo.save(newLevel);
    }

    async update(id: number, changes: UpdateLevelDto) {
        const level = await this.levelRepo.findOne({ where: { id } });
        this.levelRepo.merge(level, changes);
        return this.levelRepo.save(level);
    }

    remove(id: number) {
        return this.levelRepo.delete(id);
    }
}
