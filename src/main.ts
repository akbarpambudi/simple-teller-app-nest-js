import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ErrorHandlerInterceptor } from './shared/interceptor/error-handler.interceptor';
import { CodedErrorExceptionFilter } from './shared/exception-filter/coded-error.exception-filter';
function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Simple Teller APP')
    .setDescription('The simple teller APP API documentation')
    .setVersion('1.0')
    .addTag('teller-app')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}

function setupGlobalExceptionHandler(app: INestApplication) {
  app.useGlobalInterceptors(new ErrorHandlerInterceptor());
  app.useGlobalFilters(new CodedErrorExceptionFilter());
}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  setupSwagger(app);
  setupGlobalExceptionHandler(app);
  await app.listen(3000);
}
bootstrap();
