-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "every" TEXT,
ALTER COLUMN "timeEnd" DROP NOT NULL;
