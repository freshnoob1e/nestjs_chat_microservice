import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { CreateChatroomDto } from '../src/chatroom/dto/create-chatroom.dto';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanupDB();

    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(async () => {
    await prisma.cleanupDB();
    app.close();
  });

  describe('Chatroom', () => {
    const createChatDto: CreateChatroomDto = {
      uid_main: 'uid1',
      name_main: 'test1',
      uid_target: 'uid2',
      name_target: 'test2',
    };

    it('Should create user for/and chatroom if not exist', () => {
      return pactum
        .spec()
        .post('/chatroom')
        .withBody(createChatDto)
        .expectStatus(201)
        .inspect();
    });

    it('Should return existing room', () => {
      return pactum
        .spec()
        .post('/chatroom')
        .withBody(createChatDto)
        .expectStatus(201)
        .inspect();
    });

    it("Should show chatroom's messages if room exists", () => {});

    it("Should show chatroom's info", () => {});

    it('Should delete chatroom', () => {});
  });

  describe('Message', () => {
    it('Should send message to chatroom', () => {});

    it('Should get message info', () => {});
  });
});
