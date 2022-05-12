-- CreateTable
CREATE TABLE "Deck" (
    "deckId" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "shuffled" BOOLEAN NOT NULL,
    "remaining" INTEGER,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("deckId")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "suit" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "deckDeckId" INTEGER,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_deckDeckId_fkey" FOREIGN KEY ("deckDeckId") REFERENCES "Deck"("deckId") ON DELETE SET NULL ON UPDATE CASCADE;
