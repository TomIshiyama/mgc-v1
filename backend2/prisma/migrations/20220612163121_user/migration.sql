-- CreateTable
CREATE TABLE `attendees` (
    `user_id` INTEGER NOT NULL,
    `event_id` INTEGER NOT NULL,
    `last_update` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_date` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `event_id`(`event_id`),
    PRIMARY KEY (`user_id`, `event_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` TINYINT NOT NULL AUTO_INCREMENT,
    `category_code` VARCHAR(30) NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    INDEX `fk_category_code`(`category_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category_code_master` (
    `code` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `events` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `category_id` TINYINT NULL,
    `name` VARCHAR(255) NOT NULL,
    `location` VARCHAR(255) NULL,
    `detail` TEXT NULL,
    `begin` TIMESTAMP(0) NOT NULL,
    `end` TIMESTAMP(0) NOT NULL,
    `is_temporary` TINYINT NOT NULL,
    `last_update` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_date` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_category_id`(`category_id`),
    INDEX `fk_user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `given_name` VARCHAR(255) NOT NULL,
    `family_name` VARCHAR(255) NOT NULL,
    `given_kana` VARCHAR(255) NULL,
    `family_kana` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `division` VARCHAR(255) NOT NULL,
    `position` VARCHAR(255) NOT NULL,
    `icon_path` VARCHAR(255) NULL,
    `icon_name` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `theme` VARCHAR(255) NOT NULL,
    `is_admin` TINYINT NOT NULL,
    `is_stop` TINYINT NOT NULL,
    `last_update` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `attendees` ADD CONSTRAINT `attendees_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendees` ADD CONSTRAINT `attendees_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categories` ADD CONSTRAINT `fk_category_code` FOREIGN KEY (`category_code`) REFERENCES `category_code_master`(`code`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `fk_category_id` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
