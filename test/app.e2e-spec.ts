import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDeckDto } from 'src/deck/dto';

import * as pactum from 'pactum';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3000);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl(
      'http://localhost:3000',
    );
  });

  afterAll(() => {
    app.close();
  });
});

describe('Deck', () => {
  const dto: CreateDeckDto = {
    type: 'FULL',
    shuffled: true,
  };
  describe('Create', () => {
    it("should throw if 'type' empty", () => {
      return pactum
        .spec()
        .post('/api/deck/create')
        .withBody({
          shuffled: dto.shuffled,
        })
        .expectStatus(400);
    });
    it("should throw if 'shuffled' empty", () => {
      return pactum
        .spec()
        .post('/api/deck/create')
        .withBody({
          type: dto.shuffled,
        })
        .expectStatus(400);
    });
    it('should throw if no body provided', () => {
      return pactum
        .spec()
        .post('/api/deck/create')
        .expectStatus(400);
    });
    it('should successfully create a deck', () => {
      return pactum
        .spec()
        .post('/api/deck/create')
        .withBody(dto)
        .expectStatus(201);
    });
  });
});
