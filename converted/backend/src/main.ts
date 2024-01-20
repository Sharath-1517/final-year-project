import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose, { MongooseError, connection } from 'mongoose';
import {
  NotImplementedException,
  PreconditionFailedException,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Connecting mongodb
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    if (connection) console.log('Successfully connected to the database...');
  } catch (error) {
    if (error instanceof MongooseError) throw error;
    throw new PreconditionFailedException(
      'Unexpected error occurred while connecting to the database...',
    );
  }
  await app.listen(3000);
}
bootstrap();
