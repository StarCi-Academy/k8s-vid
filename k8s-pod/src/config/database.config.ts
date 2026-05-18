import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Book } from '../entities/book.entity';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host:
      process.env.DB_HOST ??
      //'localhost',
      'postgresql-service.default.svc.cluster.local',
    port: parseInt(process.env.DB_PORT ?? '6969', 10),
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'postgrespassword',
    database: process.env.DB_DATABASE ?? 'appdb',
    entities: [Book],
    synchronize: process.env.DB_SYNCHRONIZE !== 'false',
  }),
);
