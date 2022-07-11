/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Netflix` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[imdbId]` on the table `Netflix` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Netflix_id_key" ON "Netflix"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Netflix_imdbId_key" ON "Netflix"("imdbId");
