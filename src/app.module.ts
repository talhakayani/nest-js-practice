import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user.controller';

@Module({
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
