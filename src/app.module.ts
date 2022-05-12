import { Module } from '@nestjs/common';
import { DeckOfCardsModule } from './deck-of-cards/deck-of-cards.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [DeckOfCardsModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
