import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Delete,
  Headers,
} from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { CreateChatroomDto } from './dto/create-chatroom.dto';

@Controller('chatroom')
export class ChatroomController {
  constructor(private readonly chatroomService: ChatroomService) {}

  // @Post()
  // create(@Body() createChatroomDto: CreateChatroomDto) {
  //   return this.chatroomService.create(createChatroomDto);
  // }

  @Post()
  create(@Body('body') createChatroomDto: CreateChatroomDto) {
    return this.chatroomService.create(createChatroomDto);
  }

  @Get('all/:user_uid/')
  getChatrooms(@Param('user_uid') uid: string) {
    return this.chatroomService.getChatrooms(uid);
  }

  @Get(':user_uid/:target_uid')
  getChatroom(
    @Param('user_uid') uid: string,
    @Param('target_uid') target_uid: string,
  ) {
    return this.chatroomService.getChatroom(uid, target_uid);
  }

  @Delete(':user_uid/:target_uid')
  delChatroom(
    @Param('user_uid') uid: string,
    @Param('target_uid') target_uid: string,
  ) {
    return this.chatroomService.delChatroom(uid, target_uid);
  }
}
