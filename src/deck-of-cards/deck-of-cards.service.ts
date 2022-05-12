import { Body, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateDeckDto } from "./dto";
import { CardModel } from "./models/cards.model";

const suits = ["spades", "diamonds", "clubs", "hearts"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
@Injectable({})
export class DeckOfCardsService {



    constructor(private prisma: PrismaService) { }


    async createDeck(@Body() dto: CreateDeckDto) {
        // Create a new Deck
        let deck = this.newDeck();

        // save the deck to the db
        const response = await this.prisma.deck.create({
            data: {
                type: dto.type,
                shuffled: false,
                remaing: deck.length,
                cards: deck
            }
        });

        // return the response
        return response;
    }



    // Open a Deck
    openDeck() { }

    // Draw a Card 
    drawCard() { }



    private shuffle(deck: any) {
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

    private newDeck(): CardModel[] {
        let deck = new Array();

        for (let i = 0; i < suits.length; i++) {
            for (let x = 0; x < values.length; x++) {
                let card = { value: values[x], suit: suits[i], code: `${values[0] + suits[0]}` };
                deck.push(card);
            }
        }

        return deck;
    }
}