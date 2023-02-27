-- CreateTable
CREATE TABLE `team` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `author` VARCHAR(16) NOT NULL,
    `title` VARCHAR(60) NOT NULL,
    `tier` VARCHAR(7) NOT NULL,
    `ispublic` BOOLEAN NOT NULL DEFAULT true,
    `paste` VARCHAR(2000) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
