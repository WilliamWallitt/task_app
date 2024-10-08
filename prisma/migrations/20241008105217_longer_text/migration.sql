-- DropIndex
DROP INDEX `Hint_hint_idx` ON `Hint`;

-- DropIndex
DROP INDEX `Hint_Bullet_bullet_idx` ON `Hint_Bullet`;

-- DropIndex
DROP INDEX `Task_task_idx` ON `Task`;

-- AlterTable
ALTER TABLE `Hint` MODIFY `hint` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Hint_Bullet` MODIFY `bullet` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Task` MODIFY `task` TEXT NOT NULL,
    MODIFY `answer` TEXT NOT NULL,
    MODIFY `comments` TEXT NOT NULL;
