import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import * as cors from 'cors';
import * as express from 'express';

import { AppModule } from './app.module';

let cachedServer;

export const handler = async (event, context) => {
    if (!cachedServer) {
        const nestApp = await NestFactory.create(AppModule, {
            cors: true,
        });

        nestApp.use(cors());

        nestApp.use((req, res, next) => {
            res.contentType('application/json');
            next();
        });

        nestApp.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
            }),
        );

        const config = new DocumentBuilder()
            .setTitle('ED Test')
            .setDescription('Management of the Maturity Assessment')
            .setVersion('1.0')
            .build();
        const document = SwaggerModule.createDocument(nestApp, config);
        SwaggerModule.setup('docs', nestApp, document);

        nestApp.enableCors();

        await nestApp.init();

        cachedServer = serverlessExpress({
            app: nestApp.getHttpAdapter().getInstance(),
        });
    }

    return cachedServer(event, context);
};
