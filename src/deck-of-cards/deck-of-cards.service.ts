import { Injectable } from "@nestjs/common";

@Injectable({})
export class DeckOfCardsService {
    constructor() { }

    // Create a new Deck
    createDeck() {
        return 'I have created a new deck'
    }

    // Open a Deck
    openDeck() {

    }

    // Draw a Card 
    drawCard() {

    }
}