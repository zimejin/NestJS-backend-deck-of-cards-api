import { Body, ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { CreateDeckDto } from "./dto";
import { Card, Deck } from "@prisma/client";

// Global variables
const suits = ["spades", "diamonds", "clubs", "hearts"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
@Injectable({})
export class DeckService {

    constructor(private prisma: PrismaService) { }

    async createDeck(@Body() dto: CreateDeckDto) {
        try {
            // Create a new Deck
            let deck: Card[] = this.createDeck_Helper();
            const shuffled = dto.shuffled.toLowerCase() == 'false' ? false : true;
            const deckSize = deck.length;
            if (shuffled) deck = this.shuffle(deck);
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
    async openDeck(deckId: number): Promise<Deck & { cards: Card[]; }> {
        try {
            const openDeck = await this.prisma.deck.findUnique({
                where: { deckId: deckId },
                include: { cards: true },
            });
            // if deck does not exist throw exception
            if (!openDeck) throw new ForbiddenException(`Cannot find deck with deckId ${deckId}`);
            return openDeck;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new ForbiddenException(error.message);
            };
            // if error not from prisma, throw the error
            throw error;
        }
    }

    // Draw a Card 
    async drawCard(deckId: number, count: number = 50) {
        try {
            // Get the deck by id
            const deck = await this.prisma.deck.findUnique({
                where: { deckId: deckId },
                include: { cards: true },
            });

            // if deck does not exist throw exception
            if (!deck) throw new ForbiddenException(`Cannot find deck with deckId ${deckId}`);

            const drawnCards = { cards: deck.cards.splice(0, count) };
            const _count = deck.cards.length;

            // Update the db with changes
            const transaction = await this.prisma.deck.update({
                where: {
                    deckId: deckId,
                },
                data: {
                    remaining: _count,
                    // cards: {
                    //     create: deck.cards
                    // }
                },
            });

            console.log({
                transaction_response: transaction
            })

            return drawnCards;
        } catch (error) {
            console.log(error)
            if (error instanceof PrismaClientKnownRequestError) {
                throw new ForbiddenException(error.message);
            };
            // if error not from prisma, throw the error
            throw error;
        }
    }



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

    private createDeck_Helper() {
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