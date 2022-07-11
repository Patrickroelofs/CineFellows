-- CreateTable
CREATE TABLE "Netflix" (
    "id" SERIAL NOT NULL,
    "netflixName" TEXT NOT NULL,
    "imdbId" TEXT NOT NULL,
    "imdbRating" TEXT NOT NULL,
    "imdbVotes" TEXT NOT NULL,
    "metaScore" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Netflix_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Netflix_id_key" ON "Netflix"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Netflix_netflixName_key" ON "Netflix"("netflixName");

-- CreateIndex
CREATE UNIQUE INDEX "Netflix_imdbId_key" ON "Netflix"("imdbId");
