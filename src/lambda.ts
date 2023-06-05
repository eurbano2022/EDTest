import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configure as serverlessEspress } from '@vendia/serverless-express';

import { AppModule } from './app.module';

let cachedServer;

export const handler = async (event, context) => {
    if (!cachedServer) {
        const nestApp = await NestFactory.create(AppModule);
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
            // .addApiKey({ type: 'apiKey', name: 'Authorization', in: 'header' }, 'bearerToken')
            .build();
        const document = SwaggerModule.createDocument(nestApp, config);
        SwaggerModule.setup('docs', nestApp, document);

        await nestApp.init();
        cachedServer = serverlessEspress({
            app: nestApp.getHttpAdapter().getInstance(),
        });
    }
    const response = await cachedServer(event, context);

    // Agregar los encabezados en la respuesta
    response.headers = {
        ...response.headers,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    };

    return response;
};
