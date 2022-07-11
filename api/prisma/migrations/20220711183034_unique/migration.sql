/*
  Warnings:

  - A unique constraint covering the columns `[netflixName]` on the table `Netflix` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Netflix_netflixName_key" ON "Netflix"("netflixName");
