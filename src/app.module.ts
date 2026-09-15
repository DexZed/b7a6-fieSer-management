import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { SubjectsModule } from './subjects/subjects.module.js';

@Module({
  imports: [SubjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
