import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserMiddleware } from './middlewares/user.middleware';
import { UserModule } from './modules/users.module';

@Module({
  imports: [UserModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes({ path: 'user/addUser', method: RequestMethod.POST });
  }
}
