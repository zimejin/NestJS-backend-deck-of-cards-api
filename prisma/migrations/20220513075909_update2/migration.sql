/*
  Warnings:

  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Deck` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `code` to the `cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `suit` to the `cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_deckDeckId_fkey";

-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "suit" TEXT NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL;

-- DropTable
DROP TABLE "Card";

-- DropTable
DROP TABLE "Deck";
