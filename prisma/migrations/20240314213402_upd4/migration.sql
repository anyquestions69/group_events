-- CreateTable
CREATE TABLE "_ContactToEvent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ContactToEvent_AB_unique" ON "_ContactToEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_ContactToEvent_B_index" ON "_ContactToEvent"("B");

-- AddForeignKey
ALTER TABLE "_ContactToEvent" ADD CONSTRAINT "_ContactToEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactToEvent" ADD CONSTRAINT "_ContactToEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
