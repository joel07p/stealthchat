import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketIOAdapter } from './websocket/socket-io-adapter';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {cors: true})
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({})
  app.setGlobalPrefix('api')

  const configService = app.get(ConfigService)
  const PORT = configService.get<number>('PORT') || 3300

  app.useWebSocketAdapter(new SocketIOAdapter(app, configService))

  await app.listen(PORT)
  
  Logger.log("App listens on port: " + PORT)
}

bootstrap();