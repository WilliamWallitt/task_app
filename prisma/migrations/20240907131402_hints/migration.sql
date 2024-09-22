-- CreateTable
CREATE TABLE "Hint" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hint" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Hint_Bullets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bullet" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hintId" INTEGER NOT NULL,
    CONSTRAINT "Hint_Bullets_hintId_fkey" FOREIGN KEY ("hintId") REFERENCES "Hint" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "task" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "comments" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "attempts" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Task" ("answer", "attempts", "comments", "createdAt", "id", "task", "updatedAt") SELECT "answer", "attempts", "comments", "createdAt", "id", "task", "updatedAt" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE INDEX "Task_task_idx" ON "Task"("task");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "Hint_hint_idx" ON "Hint"("hint");

-- CreateIndex
CREATE INDEX "Hint_Bullets_bullet_idx" ON "Hint_Bullets"("bullet");
