import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAnswerDto, UpdateAnswerDto } from '../dtos/answer.dto';
import { Answer } from '../entities/answer.entity';

import { CompaniesService } from './companies.service';
import { CriteriaService } from './criteria.service';

@Injectable()
export class AnswersService {
    constructor(
        @InjectRepository(Answer)
        private answerRepo: Repository<Answer>,
        private criteriaService: CriteriaService,
        private companyService: CompaniesService,
    ) {}

    findAll() {
        return this.answerRepo.find({
            relations: ['criteria', 'company'],
        });
    }

    async findOne(id: number) {
        const answer = await this.answerRepo.findOne({ where: { id } });
        if (!answer) {
            throw new NotFoundException(`Answer #${id} not found`);
        }
        return answer;
    }

    async create(data: CreateAnswerDto) {
        const newAnswer = this.answerRepo.create(data);
        if (data.companyId) {
            const company = await this.companyService.findOne(data.companyId);
            newAnswer.company = company;
        }
        if (data.criteriaId) {
            const criteria = await this.criteriaService.findOne(
                data.criteriaId,
            );
            newAnswer.criteria = criteria;
        }
        return this.answerRepo.save(newAnswer);
    }

    async update(id: number, changes: UpdateAnswerDto) {
        const answer = await this.answerRepo.findOne({ where: { id } });
        if (changes.companyId) {
            const company = await this.companyService.findOne(
                changes.companyId,
            );
            answer.company = company;
        }
        if (changes.criteriaId) {
            const criteria = await this.criteriaService.findOne(
                changes.criteriaId,
            );
            answer.criteria = criteria;
        }
        this.answerRepo.merge(answer, changes);
        return this.answerRepo.save(answer);
    }

    remove(id: number) {
        return this.answerRepo.delete(id);
    }
}
