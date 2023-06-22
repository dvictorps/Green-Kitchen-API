/*
  Warnings:

  - Added the required column `preparingTime` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `recipe` ADD COLUMN `preparingTime` INTEGER NOT NULL;
