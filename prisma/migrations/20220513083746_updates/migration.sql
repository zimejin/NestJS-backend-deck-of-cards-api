/*
  Warnings:

  - You are about to drop the column `deckDeckId` on the `cards` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "cards" DROP CONSTRAINT "cards_deckDeckId_fkey";

-- AlterTable
ALTER TABLE "cards" DROP COLUMN "deckDeckId",
ADD COLUMN     "cardDeckId" INTEGER;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_cardDeckId_fkey" FOREIGN KEY ("cardDeckId") REFERENCES "decks"("deckId") ON DELETE SET NULL ON UPDATE CASCADE;
