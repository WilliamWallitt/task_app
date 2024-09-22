/*
  Warnings:

  - You are about to drop the `Hint_Bullets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Hint_Bullets";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Hint_Bullet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bullet" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hintId" INTEGER NOT NULL,
    CONSTRAINT "Hint_Bullet_hintId_fkey" FOREIGN KEY ("hintId") REFERENCES "Hint" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Hint_Bullet_bullet_idx" ON "Hint_Bullet"("bullet");
