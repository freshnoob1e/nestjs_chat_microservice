import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { CreateChatroomDto } from './dto/create-chatroom.dto';

@Controller('chatroom')
export class ChatroomController {
  constructor(private readonly chatroomService: ChatroomService) {}

  @Post()
  create(@Body() createChatroomDto: CreateChatroomDto) {
    return this.chatroomService.create(createChatroomDto);
  }

  // @Get()
  // getChatroom(@Body('user_uid') uid: string, @Body('target_uid') target_uid: string){
  //   return this.chatroomService.getChatroom()
  // }
}
