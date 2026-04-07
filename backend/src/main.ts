import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import mongoose from 'mongoose';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const dbUrl = process.env.DATABASE_URL;
  await mongoose.connect(dbUrl);
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/afisha');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
