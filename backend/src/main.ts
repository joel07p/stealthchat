import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())

  const configService = app.get(ConfigService)
  const PORT = configService.get<number>('PORT')

  await app.listen(PORT || 3300)
  
  Logger.log("App listens on port: " + PORT)
}

bootstrap();