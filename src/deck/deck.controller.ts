import { Body, Controller, Post } from "@nestjs/common";
import { DeckService } from "./deck.service";
import { CreateDeckDto } from "./dto";

@Controller('api')
export class DeckController {

    constructor(private deckOfCardsService: DeckService) { }

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