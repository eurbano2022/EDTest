import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivitiesController } from './controllers/activities.controller';
import { AnswersController } from './controllers/answers.controller';
import { CompaniesController } from './controllers/companies.controller';
import { CriteriaController } from './controllers/criteria.controller';
import { GoalsController } from './controllers/goals.controller';
import { LevelsController } from './controllers/levels.controller';
import { ProcessAreasController } from './controllers/process-areas.controller';
import { ResourcesController } from './controllers/resources.controller';
import { Activity } from './entities/activity.entity';
import { Answer } from './entities/answer.entity';
import { Company } from './entities/company.entity';
import { Criteria } from './entities/criteria.entity';
import { Goal } from './entities/goal.entity';
import { Level } from './entities/level.entity';
import { Practice } from './entities/practice.entity';
import { ProcessArea } from './entities/process-area.entity';
import { Resource } from './entities/resource.entity';
import { ActivitiesService } from './services/activities.service';
import { AnswersService } from './services/answers.service';
import { CompaniesService } from './services/companies.service';
import { CriteriaService } from './services/criteria.service';
import { GoalsService } from './services/goals.service';
import { LevelsService } from './services/levels.service';
import { ProcessAreasService } from './services/process-areas.service';
import { ResourcesService } from './services/resources.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Level,
            ProcessArea,
            Criteria,
            Activity,
            Resource,
            Answer,
            Goal,
            Practice,
            Company,
        ]),
    ],
    providers: [
        LevelsService,
        ProcessAreasService,
        CriteriaService,
        ActivitiesService,
        ResourcesService,
        AnswersService,
        CompaniesService,
        GoalsService,
        ActivitiesService,
    ],
    controllers: [
        CriteriaController,
        ProcessAreasController,
        LevelsController,
        ActivitiesController,
        ResourcesController,
        AnswersController,
        CompaniesController,
        GoalsController,
        ActivitiesController,
    ],
})
export class AssessmentsModule {}
