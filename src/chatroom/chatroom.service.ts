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
    // Check if user exixst
    let user_main = await this.prisma.user.findUnique({
      where: {
        uid: createChatroomDto.uid_main,
      },
    });
    if (!user_main) {
      const userDto: UserDto = {
        uid: createChatroomDto.uid_main,
        name: createChatroomDto.name_main,
      };
      user_main = await this.prisma.user.create({
        data: userDto,
      });
    }

    let user_target = await this.prisma.user.findUnique({
      where: {
        uid: createChatroomDto.uid_target,
      },
    });
    if (!user_target) {
      const userDto: UserDto = {
        uid: createChatroomDto.uid_target,
        name: createChatroomDto.name_target,
      };
      user_target = await this.prisma.user.create({
        data: userDto,
      });
    }

    // check if already exists
    const getUsersAndRooms = await this.prisma.user.findMany({
      where: {
        uid: user_main.uid,
      },
      include: {
        chatrooms: {
          include: {
            users: true,
          },
        },
      },
    });

    let chatrooms = getUsersAndRooms[0].chatrooms;
    let roomExists = false;
    let returnRoom = null;
    for (const room in chatrooms) {
      let users = chatrooms[room].users;

      for (const user in users) {
        if (users[user].id === user_target.id) {
          roomExists = true;
          return chatrooms[room];
        }
      }
    }

    if (!roomExists) {
      // create chatroom
      returnRoom = await this.prisma.chatroom.create({
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
      });
      return chatrooms;
    }
    throw new HttpException(
      'Internal Server Error.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  getChatroom(uid: string, target: string) {
    const user = this.userService.getUser(uid);
  }

  findOne(id: number) {
    return `This action returns a #${id} chatroom`;
  }

  update(id: number, updateChatroomDto: UpdateChatroomDto) {
    return `This action updates a #${id} chatroom`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatroom`;
  }
}
