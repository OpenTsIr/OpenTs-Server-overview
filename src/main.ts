import { NestFactory } from '@nestjs/core';
import AppModule from './Modules/App.Module';

async function bootstrap(): Promise<void>
{
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
