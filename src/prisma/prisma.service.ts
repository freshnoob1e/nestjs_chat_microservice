import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  cleanupDB() {
    return this.$transaction([
      this.chatroom.deleteMany(),
      this.message.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
}
