/* eslint-disable @nx/enforce-module-boundaries */
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';

export const ThrottlerProvider = ThrottlerModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    //1 phut toi da 5 requests
    throttlers: [{ ttl: 60, limit: 5 }],
    errorMessage: 'Too many requests, please try again later!!!',
    storage: new ThrottlerStorageRedisService({
      host: configService.get('REDIS_CONFIG.HOST'),
      port: configService.get('REDIS_CONFIG.PORT'),
    }),
  }),
});
