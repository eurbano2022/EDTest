import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssessmentsModule } from './assessments/assessments.module';
import config from './config';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './environments';
import { GoalsController } from './feed/assessments/controllers/goals/goals.controller';
import { GoalsController } from './flet/assessments/controllers/goals/goals.controller';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: enviroments[process.env.NODE_ENV] || '.env',
            load: [config],
            isGlobal: true,
            validationSchema: Joi.object({
                MY_SQL_HOST: Joi.string().required(),
                MY_SQL_DB: Joi.string().required(),
                MY_SQL_USER: Joi.string().required(),
                MY_SQL_PASSWORD: Joi.string().required(),
                MY_SQL_PORT: Joi.number().required(),
            }),
        }),
        UsersModule,
        AssessmentsModule,
        DatabaseModule,
    ],
    controllers: [AppController, GoalsController],
    providers: [AppService],
})
export class AppModule {}
