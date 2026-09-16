import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { CatchEverythingFilter } from './common/exceptions/global.exceptions.js';
import { TransformInterceptor } from './lib/transform.interceptor.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
    cors: true,
  });
  app.setGlobalPrefix('api');

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new CatchEverythingFilter(httpAdapter));
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
