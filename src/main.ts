import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { CatchEverythingFilter } from './common/exceptions/global.exceptions.js';
import { TransformInterceptor } from './lib/transform.interceptor.js';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { cleanupOpenApiDoc } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
    cors: true,
  });

  app.setGlobalPrefix('api');

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new CatchEverythingFilter(httpAdapter));
  app.useGlobalInterceptors(new TransformInterceptor());

  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('University Dashboard Management')
    .setDescription('University Dashboard Management API')
    .setVersion('1.0')
    .addTag('university-dashboard')
    .build();
  const rawDocument = SwaggerModule.createDocument(app, config);
  const document = cleanupOpenApiDoc(rawDocument);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
