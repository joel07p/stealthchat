import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
   })

  const configService = app.get(ConfigService)
  const PORT = configService.get<number>('PORT') || 3300

  await app.listen(PORT)
  
  Logger.log("App listens on port: " + PORT)
}

bootstrap();