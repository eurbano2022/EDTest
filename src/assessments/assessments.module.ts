import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CriteriaController } from './controllers/criteria.controller';
import { LevelsController } from './controllers/levels.controller';
import { ProcessAreasController } from './controllers/process-areas.controller';
import { Criteria } from './entities/criteria.entity';
import { Level } from './entities/level.entity';
import { ProcessArea } from './entities/process-area.entity';
import { CriteriaService } from './services/criteria.service';
import { LevelsService } from './services/levels.service';
import { ProcessAreasService } from './services/process-areas.service';

@Module({
    imports: [TypeOrmModule.forFeature([Level, ProcessArea, Criteria])],
    providers: [LevelsService, ProcessAreasService, CriteriaService],
    controllers: [CriteriaController, ProcessAreasController, LevelsController],
})
export class AssessmentsModule {}
