-- CreateTable
CREATE TABLE `Task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `task` VARCHAR(255) NOT NULL,
    `answer` VARCHAR(255) NOT NULL,
    `comments` VARCHAR(255) NOT NULL,
    `difficulty` INTEGER NOT NULL DEFAULT 0,
    `status` VARCHAR(191) NOT NULL DEFAULT 'DRAFT',
    `completed` BOOLEAN NOT NULL DEFAULT false,
    `attempts` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Task_task_idx`(`task`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hint` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hint` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Hint_hint_idx`(`hint`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hint_Bullet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bullet` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `hintId` INTEGER NOT NULL,

    INDEX `Hint_Bullet_bullet_idx`(`bullet`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Hint_Bullet` ADD CONSTRAINT `Hint_Bullet_hintId_fkey` FOREIGN KEY (`hintId`) REFERENCES `Hint`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
