import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProcessArea } from '../entities/process-area.entity';
import { CreateProcessAreaDto, UpdateProcessAreaDto } from '../dtos/process-area.dto';
import { LevelsService } from './levels.service';


@Injectable()
export class ProcessAreasService {
    constructor(
        @InjectRepository(ProcessArea)
        private processAreaRepo: Repository<ProcessArea>,
        private levelsService: LevelsService,
    ) {}

    findAll() {
        return this.processAreaRepo.find({
            relations:['level']
        });
    }

    async findOne(id: number) {
        const processArea = await this.processAreaRepo.findOne({ where: { id } });
        if (!processArea) {
            throw new NotFoundException(`ProcessArea #${id} not found`);
        }
        return processArea;
    }

    async create(data: CreateProcessAreaDto) {
        const newProcessArea = this.processAreaRepo.create(data);
        if (data.levelId) {
            const level = await this.levelsService.findOne(data.levelId);
            newProcessArea.level = level;
        }
        return this.processAreaRepo.save(newProcessArea);
    }

    async update(id: number, changes: UpdateProcessAreaDto) {
        const processArea = await this.processAreaRepo.findOne({ where: { id } });
        if (changes.levelId) {
            const level = await this.levelsService.findOne(changes.levelId);
            processArea.level = level;
        }
        this.processAreaRepo.merge(processArea, changes);
        return this.processAreaRepo.save(processArea);
    }

    remove(id: number) {
        return this.processAreaRepo.delete(id);
    }
}
