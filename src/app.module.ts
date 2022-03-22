import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { MessageModule } from './message/message.module';
import { UserModule } from './user/user.module';
import { ChatroomModule } from './chatroom/chatroom.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MessageModule,
    UserModule,
    ChatroomModule,
  ],
})
export class AppModule {}
