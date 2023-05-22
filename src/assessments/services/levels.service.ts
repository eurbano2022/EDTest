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
        const product = await this.levelRepo.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException(`Product #${id} not found`);
        }
        return product;
    }

    create(data: CreateLevelDto) {
        const newProduct = this.levelRepo.create(data);
        return this.levelRepo.save(newProduct);
    }

    async update(id: number, changes: UpdateLevelDto) {
        const product = await this.levelRepo.findOne({ where: { id } });
        this.levelRepo.merge(product, changes);
        return this.levelRepo.save(product);
    }

    remove(id: number) {
        return this.levelRepo.delete(id);
    }
}
