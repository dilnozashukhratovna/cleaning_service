import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

const start = async () => {
  try {
    const config = new DocumentBuilder()
      .setTitle('Cleaning Service Project')
      .setDescription('Mini project for cleaning service')
      .setVersion('1.0.0')
      .addTag('NodeJs, NestJs, Postgress, Sequielize, JWT, OTP, Swagger')
      .build();

    const PORT = process.env.PORT || 3003;
    const app = await NestFactory.create(AppModule);
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);
    app.use(cookieParser());
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () => {
      console.log(`Server ${PORT}-portda ishga tushdi`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
