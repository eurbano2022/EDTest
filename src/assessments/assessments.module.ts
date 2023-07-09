import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivitiesController } from './controllers/activities.controller';
import { AnswersController } from './controllers/answers/answers.controller';
import { CompaniesController } from './controllers/companies.controller';
import { CriteriaController } from './controllers/criteria.controller';
import { GoalsController } from './controllers/goals.controller';
import { LevelsController } from './controllers/levels.controller';
import { PracticesController } from './controllers/practices.controller';
import { ProcessAreasController } from './controllers/process-areas.controller';
import { ResourcesController } from './controllers/resources.controller';
import { Activity } from './entities/activity.entity';
import { Criteria } from './entities/criteria.entity';
import { Level } from './entities/level.entity';
import { ProcessArea } from './entities/process-area.entity';
import { Resource } from './entities/resource.entity';
import { ActivitiesService } from './services/activities.service';
import { CriteriaService } from './services/criteria.service';
import { LevelsService } from './services/levels.service';
import { ProcessAreasService } from './services/process-areas.service';
import { ResourcesService } from './services/resources.service';
import { PracticesService } from './controllers/practices.service';
import { PracticesService } from './services/practices.service';
import { CompaniesService } from './services/companies.service';
import { GoalsService } from './services/goals.service';
import { AnswersService } from './services/answers.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Level,
            ProcessArea,
            Criteria,
            Activity,
            Resource,
        ]),
    ],
    providers: [
        LevelsService,
        ProcessAreasService,
        CriteriaService,
        ActivitiesService,
        ResourcesService,
        PracticesService,
        CompaniesService,
        GoalsService,
        AnswersService,
    ],
    controllers: [
        CriteriaController,
        ProcessAreasController,
        LevelsController,
        ActivitiesController,
        ResourcesController,
        AnswersController,
        GoalsController,
        CompaniesController,
        PracticesController,
    ],
})
export class AssessmentsModule {}
