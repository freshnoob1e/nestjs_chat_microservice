import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { UpdateChatroomDto } from './dto/update-chatroom.dto';

@Injectable()
export class ChatroomService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async create(createChatroomDto: CreateChatroomDto) {
    if (createChatroomDto.uid_main === createChatroomDto.uid_target) {
      throw new HttpException(
        'Invalid uid (Cannot be same user)',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Check if user exixst
    const userDto: UserDto = {
      uid: createChatroomDto.uid_main,
      name: createChatroomDto.name_main,
    };
    const user_main = await this.userService.getUserOrCreateNew(userDto);

    const targetUserDto: UserDto = {
      uid: createChatroomDto.uid_target,
      name: createChatroomDto.name_target,
    };
    const user_target = await this.userService.getUserOrCreateNew(
      targetUserDto,
    );

    // check if room already exists
    const getUsersAndRooms = await this.prisma.user.findUnique({
      where: {
        uid: user_main.uid,
      },
      include: {
        chatrooms: {
          include: {
            users: true,
            messages: true,
          },
        },
      },
    });

    let chatrooms = getUsersAndRooms.chatrooms;
    for (const room in chatrooms) {
      let users = chatrooms[room].users;

      for (const user in users) {
        if (users[user].id === user_target.id) {
          return chatrooms[room];
        }
      }
    }

    // create chatroom if not exists
    const returnRoom = await this.prisma.chatroom.create({
      data: {
        users: {
          connect: [
            {
              id: user_main.id,
            },
            {
              id: user_target.id,
            },
          ],
        },
      },
      include: {
        users: true,
        messages: true,
      },
    });
    return returnRoom;
  }

  async getChatroom(uid: string, target_uid: string) {
    if (uid === target_uid) {
      throw new HttpException('Invalid target uid', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userService.getUser(uid);

    const userRooms = user.chatrooms;

    for (const room in userRooms) {
      const currentRoom = userRooms[room];
      for (const roomUser in currentRoom.users) {
        const currentRoomUser = currentRoom.users[roomUser];
        if (currentRoomUser.uid === target_uid) {
          return currentRoom;
        }
      }
    }

    throw new HttpException('Room does not exists', HttpStatus.NOT_FOUND);
  }

  async delChatroom(uid: string, target_uid: string) {
    const room = await this.getChatroom(uid, target_uid);
    await this.prisma.user.update({
      where: {
        uid: uid,
      },
      data: {
        chatrooms: {
          disconnect: {
            id: room.id,
          },
        },
      },
    });
    return 'OK';
  }

  async getChatrooms(uid: string) {
    const user = await this.userService.getUser(uid);
    const rooms = user.chatrooms;
    return rooms;
  }
}
