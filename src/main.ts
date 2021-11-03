import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);

  const PORT = configService.get('API_PORT');

  await app.listen(PORT);

  logger.log(`application is running in PORT: ${PORT}`);
}
bootstrap();
