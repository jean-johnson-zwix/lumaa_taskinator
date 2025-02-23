import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { TaskController } from './controller/task.controller';
import { TypeOrmModule } from './datasource/datasource.module';
import { TaskService } from './service/task.service';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule,
    ConfigModule.forRoot(),
      JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '60m' },
      }),
  ],
  controllers: [AppController, TaskController, AuthController],
  providers: [AppService, AuthService, TaskService],
})
export class AppModule {}
