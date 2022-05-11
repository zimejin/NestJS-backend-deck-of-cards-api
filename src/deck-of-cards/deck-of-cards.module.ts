import { Module } from '@nestjs/common';
import { DeckOfCardsController } from './deck-of-cards.controller';
import { DeckOfCardsService } from './deck-of-cards.service';

@Module({
    controllers: [DeckOfCardsController],
    providers: [DeckOfCardsService]
})
export class DeckOfCardsModule { }
