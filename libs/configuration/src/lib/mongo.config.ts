import { Logger, Optional } from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';

export class MongoConfiguration {
  @IsString()
  @IsNotEmpty()
  URL: string;

  @IsString()
  @IsNotEmpty()
  DB_NAME: string;

  @IsNumber()
  @Optional()
  POOL_SIZE?: number;

  @IsNumber()
  @Optional()
  CONNECT_TIMEOUT_MS?: number;

  @IsNumber()
  @Optional()
  SOCKET_TIMEOUT_MS?: number;

  constructor(data?: Partial<MongoConfiguration>) {
    this.URL = data?.URL || process.env['MONGODB_URI'] || '';
    this.DB_NAME = data?.DB_NAME || process.env['MONGODB_DB_NAME'] || '';
    this.POOL_SIZE = data?.POOL_SIZE || Number(process.env['MONGODB_POOL_SIZE']) || 10;
    this.CONNECT_TIMEOUT_MS = data?.CONNECT_TIMEOUT_MS || Number(process.env['MONGODB_CONNECTION_TIMEOUT_MS']) || 15000;
    this.SOCKET_TIMEOUT_MS = data?.SOCKET_TIMEOUT_MS || Number(process.env['MONGODB_SOCKET_TIMEOUT_MS']) || 360000;
  }
}

export const MongoProvider = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configServer: ConfigService) => ({
    uri: configServer.get('MONGO_CONFIG.URL'),
    dbName: configServer.get('MONGO_CONFIG.DB_NAME'),
    maxPoolSize: configServer.get('MONGO_CONFIG.POOL_SIZE'),
    connectTimeoutMS: configServer.get('MONGO_CONFIG.CONNECT_TIMEOUT_MS'),
    socketTimeoutMS: configServer.get('MONGO_CONFIG.SOCKET_TIMEOUT_MS'),

    onConnectionCreate: (connection: Connection) => {
      connection.on('connected', () => Logger.log('connected'));
      connection.on('open', () => Logger.log('open'));
      connection.on('disconnected', () => Logger.log('disconnected'));
      connection.on('reconnected', () => Logger.log('reconnected'));
      connection.on('disconnecting', () => Logger.log('disconnecting'));

      return connection;
    },
  }),
});
