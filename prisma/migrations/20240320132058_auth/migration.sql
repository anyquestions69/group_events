/*
  Warnings:

  - You are about to drop the column `link` on the `Contact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "link",
ADD COLUMN     "telegram" TEXT;
