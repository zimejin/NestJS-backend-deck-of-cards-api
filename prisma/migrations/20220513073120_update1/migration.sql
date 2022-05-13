/*
  Warnings:

  - You are about to drop the column `code` on the `cards` table. All the data in the column will be lost.
  - You are about to drop the column `suit` on the `cards` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `cards` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cards" DROP COLUMN "code",
DROP COLUMN "suit",
DROP COLUMN "value";
