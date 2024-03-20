/*
  Warnings:

  - You are about to drop the column `companyId` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_companyId_fkey";

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "companyId",
ADD COLUMN     "company" TEXT;

-- DropTable
DROP TABLE "Company";
