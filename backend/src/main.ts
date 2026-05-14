import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TskvLogger } from './logger/tskv.logger';
import { DevLogger } from './logger/dev.logger';
import { JsonContains } from 'typeorm';
import { JsonLogger } from './logger/json.logger';

async function bootstrap() {

  const loggerType = process.env.LOGGER_TYPE;
  let logger;
  
  switch (loggerType) {
    case 'dev':
      logger = new DevLogger();
      break;
    case 'json':
      logger = new JsonLogger();
      break;
    case 'tskv':
      logger = new TskvLogger();
      break;
  }

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.setGlobalPrefix('api/afisha');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  app.useLogger(logger);
  await app.listen(3000);
}
bootstrap();
