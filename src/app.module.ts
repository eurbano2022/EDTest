import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AssessmentsModule } from './assessments/assessments.module';
import { ServicesService } from './users.services.ts/users/services/services.service';

@Module({
    imports: [UsersModule, AssessmentsModule],
    controllers: [AppController],
    providers: [AppService, ServicesService],
})
export class AppModule {}
