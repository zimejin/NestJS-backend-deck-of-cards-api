import { Module } from '@nestjs/common';
import { DeckOfCardsModule } from './deck-of-cards/deck-of-cards.module';

@Module({
  imports: [DeckOfCardsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
