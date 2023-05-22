import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AssessmentsModule } from './assessments/assessments.module';

@Module({
    imports: [UsersModule, AssessmentsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
