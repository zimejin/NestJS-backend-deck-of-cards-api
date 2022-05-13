-- CreateTable
CREATE TABLE "decks" (
    "deckId" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "shuffled" BOOLEAN NOT NULL,
    "remaining" INTEGER,

    CONSTRAINT "decks_pkey" PRIMARY KEY ("deckId")
);

-- CreateTable
CREATE TABLE "cards" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "suit" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "deckDeckId" INTEGER,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_deckDeckId_fkey" FOREIGN KEY ("deckDeckId") REFERENCES "decks"("deckId") ON DELETE SET NULL ON UPDATE CASCADE;
