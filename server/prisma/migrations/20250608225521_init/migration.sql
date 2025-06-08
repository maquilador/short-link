-- CreateTable
CREATE TABLE "ShortLink" (
    "id" SERIAL NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "alias" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "ShortLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Click" (
    "id" SERIAL NOT NULL,
    "clickedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT NOT NULL,
    "shortLinkId" INTEGER NOT NULL,

    CONSTRAINT "Click_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShortLink_alias_key" ON "ShortLink"("alias");

-- CreateIndex
CREATE INDEX "Click_shortLinkId_idx" ON "Click"("shortLinkId");

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_shortLinkId_fkey" FOREIGN KEY ("shortLinkId") REFERENCES "ShortLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;
