import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as postgres from 'postgres';
import schema from './schema';

export const DRIZZLE = 'DRIZZLE';

export const drizzleProvider = {
  provide: DRIZZLE,
  inject: [ConfigService],
  async useFactory(configService: ConfigService) {
    const connection = postgres({
      host: configService.get('DB_HOST'),
      db: configService.get('DB_NAME'),
      user: configService.get('DB_USERNAME'),
      pass: configService.get('DB_PASSWORD'),
      port: parseInt(configService.get('DB_PORT')!),
    });
    return drizzle(connection, { schema });
  },
};
