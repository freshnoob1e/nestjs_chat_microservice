import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessageDto } from './dto/create-message.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post(':sender_uid/:target_uid')
  create(
    @Param('sender_uid') sender_uid: string,
    @Param('target_uid') target_uid: string,
    @Body('body') createMessageDto: MessageDto,
  ) {
    return this.messageService.create(sender_uid, target_uid, createMessageDto);
  }
}
