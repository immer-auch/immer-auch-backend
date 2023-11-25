import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule, { cors: true });
  setupSwagger(app);
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
