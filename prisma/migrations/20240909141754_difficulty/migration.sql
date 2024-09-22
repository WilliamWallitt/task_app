-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "task" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "comments" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "attempts" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Task" ("answer", "attempts", "comments", "completed", "createdAt", "id", "status", "task", "updatedAt") SELECT "answer", "attempts", "comments", "completed", "createdAt", "id", "status", "task", "updatedAt" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE INDEX "Task_task_idx" ON "Task"("task");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
