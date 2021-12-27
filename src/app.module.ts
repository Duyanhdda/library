import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MainModule } from './modules/main/main.module';
import { APP_FILTER } from '@nestjs/core';
import { UnauthorizedExceptionFilter } from './filters/unauthorized-exception.filter';
import { ExceptionModule } from './modules/exception/exception.module';
import { ForbiddenFilter } from './filters/forbidden.filter';
import { NotFoundFilter } from './filters/notfound.filter';
import { InternalServerErrorFilter } from './filters/internal.filter';

@Module({
  imports: [TypeOrmModule.forRoot(), ConfigModule.forRoot(), AuthModule, MainModule, ExceptionModule],
  controllers: [],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: UnauthorizedExceptionFilter
    },
    {
      provide: APP_FILTER,
      useClass: ForbiddenFilter,
    },
    {
      provide: APP_FILTER,
      useClass: NotFoundFilter,
    },
    {
      provide: APP_FILTER,
      useClass: InternalServerErrorFilter,
    },
  ],
})
export class AppModule { }
