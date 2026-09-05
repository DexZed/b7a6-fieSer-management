import { Module } from '@nestjs/common';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { auth } from './lib/auth.js';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation.js';
import { CustomerModule } from './customer/customer.module.js';
const __dirname = dirname(fileURLToPath(import.meta.url));

@Module({
  imports: [
    AuthModule.forRoot({ auth }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api/{*test}'],
      serveStaticOptions: {
        fallthrough: false,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
