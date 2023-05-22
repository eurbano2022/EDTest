import { Module } from '@nestjs/common';

import { CriteriaController } from './controllers/criteria.controller';
import { LevelsController } from './controllers/levels.controller';
import { ProcessAreasController } from './controllers/process-areas.controller';
import { CriteriaService } from './services/criteria.service';
import { LevelsService } from './services/levels.service';
import { ProcessAreasService } from './services/process-areas.service';

@Module({
    providers: [LevelsService, ProcessAreasService, CriteriaService],
    controllers: [CriteriaController, ProcessAreasController, LevelsController],
})
export class AssessmentsModule {}
