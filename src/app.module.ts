import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.services';

@Module({
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
