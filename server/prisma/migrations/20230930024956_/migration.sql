/*
  Warnings:

  - Changed the type of `value` on the `Claim` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Claim" DROP COLUMN "value",
ADD COLUMN     "value" BOOLEAN NOT NULL;
