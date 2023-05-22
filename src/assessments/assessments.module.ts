import { Module } from '@nestjs/common';
import { ProcessAreasService } from './services/process-areas.service';
import { CriteriaService } from './services/criteria.service';
import { CriteriaController } from './controllers/criteria.controller';
import { LevelsService } from './services/levels.service';
import { ProcessAreasController } from './controllers/process-areas.controller';
import { LevelsController } from './controllers/levels.controller';

@Module({
    providers: [LevelsService, ProcessAreasService, CriteriaService],
    controllers: [CriteriaController, ProcessAreasController, LevelsController],
})
export class AssessmentsModule {}
