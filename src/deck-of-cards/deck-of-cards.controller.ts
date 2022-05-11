import { Controller, Post } from "@nestjs/common";
import { DeckOfCardsService } from "./deck-of-cards.service";

@Controller('api')
export class DeckOfCardsController {

    constructor(private deckOfCardsService: DeckOfCardsService) { }

    // Create a new Deck
    @Post('create-deck')
    createDeck() {
        return this.deckOfCardsService.createDeck();
    }

    // Open a Deck
    openDeck() { }

    // Draw a Card 
    drawCard() { }
}