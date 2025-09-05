import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // ✅ loads .env locally
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // 👈 Enable CORS to allow frontend calls
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
