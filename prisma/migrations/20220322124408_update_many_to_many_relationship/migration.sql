/*
  Warnings:

  - You are about to drop the `chatroomonuser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `chatroomonuser` DROP FOREIGN KEY `ChatroomOnUser_chatroom_id_fkey`;

-- DropForeignKey
ALTER TABLE `chatroomonuser` DROP FOREIGN KEY `ChatroomOnUser_user_id_fkey`;

-- DropTable
DROP TABLE `chatroomonuser`;

-- CreateTable
CREATE TABLE `_ChatroomToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ChatroomToUser_AB_unique`(`A`, `B`),
    INDEX `_ChatroomToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ChatroomToUser` ADD FOREIGN KEY (`A`) REFERENCES `chats`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChatroomToUser` ADD FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
