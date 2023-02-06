import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@storagechain.3ffeqey.mongodb.net/test',
    ),
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
