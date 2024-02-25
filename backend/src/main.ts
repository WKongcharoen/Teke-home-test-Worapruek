import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export const headerApi = { 'X-CMC_PRO_API_KEY': process.env.API_KEY };

declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
