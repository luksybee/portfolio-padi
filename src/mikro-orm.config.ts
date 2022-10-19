import { Logger } from '@nestjs/common';
import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const logger = new Logger('MikroORM');

const config = {
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: 'portfolio-padi.sqlite3',
  type: 'sqlite',

  highlighter: new SqlHighlighter(),
  debug: true,
  logger: logger.log.bind(logger),

  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    tableName: 'portfolioPadi_migrations', // name of database table with log of executed transactions
    path: 'dist/migrations',
    pathTs: 'src/migrations',
    pattern: /^[\w-]+\d+\.ts$/, // regex pattern for the migration files
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: true, // allow to disable table dropping
    safe: true, // allow to disable table and column dropping
    emit: 'ts', // migration generation mode
  },

  autoLoadEntities: true,
} as Options;

export default config;
