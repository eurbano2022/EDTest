import { Module } from '@nestjs/common';
import { LevelsService } from './services/levels/levels.service';
import { ProcessAreasService } from './services/process-areas.service';
import { CriteriaService } from './services/criteria.service';
import { CriteriaController } from './controllers/criteria.controller';
import { ProcessAreasController } from './controllers/process-areas/process-areas.controller';
import { LevelsController } from './controllers/levels/levels.controller';

@Module({
  providers: [LevelsService, ProcessAreasService, CriteriaService],
  controllers: [CriteriaController, ProcessAreasController, LevelsController]
})
export class AssessmentsModule {}
