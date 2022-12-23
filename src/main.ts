import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:4200', 'https://goodreads-wrapped.netlify.app/'],
  });
  await app.listen(process.env.PORT || 3000);
  console.log('Server started on: ', process.env.PORT || 3000);
}
bootstrap();
