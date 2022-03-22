-- DropForeignKey
ALTER TABLE `chatroomonuser` DROP FOREIGN KEY `ChatroomOnUser_chatroom_id_fkey`;

-- DropForeignKey
ALTER TABLE `chatroomonuser` DROP FOREIGN KEY `ChatroomOnUser_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `ChatroomOnUser` ADD CONSTRAINT `ChatroomOnUser_chatroom_id_fkey` FOREIGN KEY (`chatroom_id`) REFERENCES `chats`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatroomOnUser` ADD CONSTRAINT `ChatroomOnUser_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
