import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DRIZZLE } from './drizzle.provider';
import schema from './schema';

@Injectable()
export class DrizzleService {
  constructor(
    @Inject(DRIZZLE) readonly db: PostgresJsDatabase<typeof schema>,
  ) {}
}
