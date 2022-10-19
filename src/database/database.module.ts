import { MikroORM } from '@mikro-orm/core';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common';

@Module({
  imports: [MikroOrmModule.forRoot()],
})
export class DatabaseModule implements NestModule, OnModuleInit {
  constructor(private readonly orm: MikroORM) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MikroOrmMiddleware).forRoutes('*');
  }
  async onModuleInit() {
    await this.orm.getMigrator().createMigration();
    await this.orm.getMigrator().up();
  }
}
