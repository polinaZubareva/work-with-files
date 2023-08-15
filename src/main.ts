import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  console.log(process.env.DB_HOST);
  console.log(process.env.DB_NAME);
  console.log(process.env.DB_PORT);
  console.log(process.env.DB_PASSWORD);
  console.log(process.env.DB_USER);
  console.log(process.env.PORT);

  await app.listen(process.env.PORT);
}
bootstrap();
