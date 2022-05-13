import { Body, ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { CreateDeckDto } from "./dto";
import { Card } from "@prisma/client";

// Global variables
const suits = ["spades", "diamonds", "clubs", "hearts"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
@Injectable({})
export class DeckService {

    constructor(private prisma: PrismaService) { }

    async createDeck(@Body() dto: CreateDeckDto) {
        try {
            // Create a new Deck
            let deck: Card[] = this.newDeck();
            const shuffled = dto.shuffled.toLowerCase() == 'false' ? false : true;
            const deckSize = deck.length;

            if (shuffled)
                deck = this.shuffle(deck);

            // Save the newly created deck to db
            const response = await this.prisma.deck.create({
                data: {
                    type: dto.type,
                    shuffled: shuffled,
                    remaining: deckSize,
                    cards: {
                        create: deck
                    }
                }
            });

            return response;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new ForbiddenException(error.message);
            };
            // if error not from prisma, throw the error
            throw error;
        }
    };



    // Open a Deck
    openDeck() {

    }

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

    private newDeck() {
        let deck = new Array();

        for (let i = 0; i < suits.length; i++) {
            for (let x = 0; x < values.length; x++) {
                let card = { value: values[x], suit: suits[i], code: `${values[0] + suits[i][0].toUpperCase()}` };
                deck.push(card);
            }
        }

        return deck;
    }
}