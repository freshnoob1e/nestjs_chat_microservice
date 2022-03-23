import { Injectable } from '@nestjs/common';
import { ChatroomService } from 'src/chatroom/chatroom.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { MessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(
    private userService: UserService,
    private chatroomService: ChatroomService,
    private prisma: PrismaService,
  ) {}

  async create(
    sender_uid: string,
    target_uid: string,
    createMessageDto: MessageDto,
  ) {
    const sender = await this.userService.getUser(sender_uid);
    const chatroom = await this.chatroomService.getChatroom(
      sender_uid,
      target_uid,
    );
    const message = await this.prisma.message.create({
      data: {
        text: createMessageDto.text,
        chatroom_id: chatroom.id,
        user_id: sender.id,
      },
    });
    return message;
  }
}
