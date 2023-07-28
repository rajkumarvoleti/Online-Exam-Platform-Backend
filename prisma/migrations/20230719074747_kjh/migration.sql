-- AlterTable
ALTER TABLE `exam` MODIFY `name` VARCHAR(256) NOT NULL;

-- AlterTable
ALTER TABLE `subject` MODIFY `name` VARCHAR(256) NOT NULL;

-- AlterTable
ALTER TABLE `topic` MODIFY `name` VARCHAR(256) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `firstName` VARCHAR(256) NOT NULL,
    MODIFY `lastName` VARCHAR(256) NULL,
    MODIFY `voucherCode` VARCHAR(512) NULL,
    MODIFY `email` VARCHAR(256) NOT NULL;
