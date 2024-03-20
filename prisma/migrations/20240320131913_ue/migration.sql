/*
  Warnings:

  - You are about to drop the column `telegram` on the `Contact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "telegram",
ADD COLUMN     "link" TEXT;
