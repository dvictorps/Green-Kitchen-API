/*
  Warnings:

  - Added the required column `stateId` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userStatusId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `recipe` ADD COLUMN `stateId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `userStatusId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `UserStatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descStatus` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecipeState` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descRecipeState` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_userStatusId_fkey` FOREIGN KEY (`userStatusId`) REFERENCES `UserStatus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recipe` ADD CONSTRAINT `Recipe_stateId_fkey` FOREIGN KEY (`stateId`) REFERENCES `RecipeState`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
