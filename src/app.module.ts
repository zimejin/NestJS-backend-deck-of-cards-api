import { Module } from '@nestjs/common';
import { DeckModule } from './deck/deck.module';
import { PrismaModule } from './prisma/prisma.module';
@Module({
  imports: [DeckModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
