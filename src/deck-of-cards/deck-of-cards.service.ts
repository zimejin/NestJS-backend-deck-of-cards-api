import { Body, Injectable } from "@nestjs/common";
import { CreateDeckDto } from "./dto";

@Injectable({})
export class DeckOfCardsService {

    suits = ["spades", "diamonds", "clubs", "hearts"];
    values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

    constructor() { }

    // Create a new Deck
    createDeck(@Body() dto: CreateDeckDto) {
        console.log({
            dto: dto
        })
        const suits = ["spades", "diamonds", "clubs", "hearts"];
        const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        let deck = new Array();

        for (let i = 0; i < suits.length; i++) {
            for (let x = 0; x < values.length; x++) {
                let card = { Value: values[x], Suit: suits[i], Code: `${values[0] + suits[0]}` };
                deck.push(card);
            }
        };

        return dto.shuffled ? this.shuffle(deck) : deck;

        // Save the deck to the db
    }

    // Open a Deck
    openDeck() { }

    // Draw a Card 
    drawCard() { }

    private shuffle(deck) {
        // for 1000 turns
        // switch the values of two random cards
        for (let i = 0; i < 1000; i++) {
            let location1 = Math.floor((Math.random() * deck.length));
            let location2 = Math.floor((Math.random() * deck.length));
            let tmp = deck[location1];

            deck[location1] = deck[location2];
            deck[location2] = tmp;
        }

        return deck;
    }
}