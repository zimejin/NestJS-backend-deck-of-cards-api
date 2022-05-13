import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { Deck, Card } from "@prisma/client";
import { DeckService } from "./deck.service";
import { CreateDeckDto } from "./dto";

@Controller('api/deck')
export class DeckController {

    constructor(private deckOfCardsService: DeckService) { }

    // Create a new Deck
    @Post('create')
    createDeck(@Body() dto: CreateDeckDto): Promise<Deck> {
        return this.deckOfCardsService.createDeck(dto);
    }

    // Open a Deck
    @Get(':id')
    openDeck(@Param('id', ParseIntPipe) deckId: number): Promise<Deck & { cards: Card[]; }> {
        return this.deckOfCardsService.openDeck(deckId);
    }

    // Draw a Card 
    drawCard() { }
}