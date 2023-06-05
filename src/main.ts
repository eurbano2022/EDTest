import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('ED Test')
        .setDescription('Management of the Maturity Assessment')
        .setVersion('1.0')
        // .addApiKey({ type: 'apiKey', name: 'Authorization', in: 'header' }, 'bearerToken')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    app.enableCors();
    await app.listen(3001);
}
bootstrap();
