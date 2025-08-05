/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[cpf]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthDate` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `birthDate` DATETIME(3) NOT NULL,
    ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `cpf` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL,
    ADD COLUMN `state` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `zipCode` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `ticket` (
    `id` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `id_event` VARCHAR(191) NOT NULL,
    `id_ticketholder` INTEGER NOT NULL,

    UNIQUE INDEX `Ticket_id_user_key`(`id_user`),
    UNIQUE INDEX `Ticket_id_event_key`(`id_event`),
    UNIQUE INDEX `Ticket_id_ticketholder_key`(`id_ticketholder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ticketholder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `birthDate` DATETIME(3) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `zipCode` VARCHAR(191) NOT NULL,
    `id_ticket` INTEGER NOT NULL,

    UNIQUE INDEX `User_cpf_key`(`cpf`),
    UNIQUE INDEX `User_phone_key`(`phone`),
    UNIQUE INDEX `TicketHolder_id_ticket_key`(`id_ticket`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_cpf_key` ON `user`(`cpf`);

-- CreateIndex
CREATE UNIQUE INDEX `User_phone_key` ON `user`(`phone`);

-- AddForeignKey
ALTER TABLE `ticket` ADD CONSTRAINT `Ticket_id_event_fkey` FOREIGN KEY (`id_event`) REFERENCES `event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ticket` ADD CONSTRAINT `Ticket_id_ticketholder_fkey` FOREIGN KEY (`id_ticketholder`) REFERENCES `ticketholder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ticket` ADD CONSTRAINT `Ticket_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
