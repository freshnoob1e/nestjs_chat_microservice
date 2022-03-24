import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(userDto: UserDto) {
    const user = this.prisma.user.findUnique({
      where: {
        uid: userDto.uid,
      },
    });
    if (user) {
      throw new HttpException('User already exists.', HttpStatus.BAD_REQUEST);
    }
    const newUser = await this.prisma.user.create({
      data: {
        uid: userDto.uid,
        name: userDto.name,
      },
    });
    return newUser;
  }

  async getUserOrCreateNew(userDto: UserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        uid: userDto.uid,
      },
    });
    if (!user) {
      return this.prisma.user.create({
        data: userDto,
      });
    }
    return user;
  }

  async getUser(uid: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        uid: uid,
      },
      include: {
        chatrooms: {
          include: {
            users: true,
            messages: {
              select: {
                date_created: true,
                text: true,
                user: {
                  select: {
                    uid: true,
                    name: true,
                  },
                },
              },
              orderBy: {
                date_created: 'desc',
              },
            },
          },
        },
      },
    });
    if (!user) {
      throw new HttpException('User does not exists', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async delUser(uid: string) {
    // Check if user exists
    const user = await this.getUser(uid);
    await this.prisma.user.delete({
      where: {
        id: user.id,
      },
    });
    return 'OK';
  }
}
