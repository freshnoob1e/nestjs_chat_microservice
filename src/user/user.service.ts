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
    const user = this.prisma.user.findUnique({
      where: {
        uid: userDto.uid,
      },
    });
    if (!user) {
      return this.create(userDto);
    }
    return user;
  }

  async getUser(uid: string) {
    const user = this.prisma.user.findUnique({
      where: {
        uid: uid,
      },
    });
    if (!user) {
      throw new HttpException("User doesn't exists", HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
