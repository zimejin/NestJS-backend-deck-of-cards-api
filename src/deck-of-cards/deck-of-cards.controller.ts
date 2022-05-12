import { Body, Controller, Post } from "@nestjs/common";
import { DeckOfCardsService } from "./deck-of-cards.service";
import { CreateDeckDto } from "./dto";

@Controller('api')
export class DeckOfCardsController {

    constructor(private deckOfCardsService: DeckOfCardsService) { }

    // Create a new Deck
    @Post('create-deck')
    createDeck(@Body() dto: CreateDeckDto) {
        return this.deckOfCardsService.createDeck(dto);
    }

    // Open a Deck
    openDeck() { }

    // Draw a Card 
    drawCard() { }
}