import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const xmlparser = require('express-xml-bodyparser');
  const app = await NestFactory.create(AppModule);
  app.use(xmlparser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3333);
}
bootstrap();
