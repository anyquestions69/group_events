/*
  Warnings:

  - You are about to drop the `ContactGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContactLanguage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContactTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ContactGroup" DROP CONSTRAINT "ContactGroup_contactId_fkey";

-- DropForeignKey
ALTER TABLE "ContactGroup" DROP CONSTRAINT "ContactGroup_groupId_fkey";

-- DropForeignKey
ALTER TABLE "ContactLanguage" DROP CONSTRAINT "ContactLanguage_contactId_fkey";

-- DropForeignKey
ALTER TABLE "ContactLanguage" DROP CONSTRAINT "ContactLanguage_languageId_fkey";

-- DropForeignKey
ALTER TABLE "ContactTag" DROP CONSTRAINT "ContactTag_contactId_fkey";

-- DropForeignKey
ALTER TABLE "ContactTag" DROP CONSTRAINT "ContactTag_tagId_fkey";

-- DropTable
DROP TABLE "ContactGroup";

-- DropTable
DROP TABLE "ContactLanguage";

-- DropTable
DROP TABLE "ContactTag";

-- CreateTable
CREATE TABLE "_ContactToLanguage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ContactToGroup" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ContactToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ContactToLanguage_AB_unique" ON "_ContactToLanguage"("A", "B");

-- CreateIndex
CREATE INDEX "_ContactToLanguage_B_index" ON "_ContactToLanguage"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ContactToGroup_AB_unique" ON "_ContactToGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_ContactToGroup_B_index" ON "_ContactToGroup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ContactToTag_AB_unique" ON "_ContactToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ContactToTag_B_index" ON "_ContactToTag"("B");

-- AddForeignKey
ALTER TABLE "_ContactToLanguage" ADD CONSTRAINT "_ContactToLanguage_A_fkey" FOREIGN KEY ("A") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactToLanguage" ADD CONSTRAINT "_ContactToLanguage_B_fkey" FOREIGN KEY ("B") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactToGroup" ADD CONSTRAINT "_ContactToGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactToGroup" ADD CONSTRAINT "_ContactToGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactToTag" ADD CONSTRAINT "_ContactToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactToTag" ADD CONSTRAINT "_ContactToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
