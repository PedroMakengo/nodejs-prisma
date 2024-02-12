/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `articles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `articles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `articles` ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `articles_userId_key` ON `articles`(`userId`);

-- AddForeignKey
ALTER TABLE `articles` ADD CONSTRAINT `articles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
