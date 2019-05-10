import { MigrationInterface, QueryRunner } from "typeorm";

export class Roles1557260184656 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `permission` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `permission` enum ('admin') NOT NULL, UNIQUE INDEX `IDX_573c75687effc7acabc05d4f6b` (`permission`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `role` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `role_permissions_permission` (`roleId` int NOT NULL, `permissionId` int NOT NULL, PRIMARY KEY (`roleId`, `permissionId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_roles_role` (`userId` int NOT NULL, `roleId` int NOT NULL, PRIMARY KEY (`userId`, `roleId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `role_permissions_permission` ADD CONSTRAINT `FK_b36cb2e04bc353ca4ede00d87b9` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `role_permissions_permission` ADD CONSTRAINT `FK_bfbc9e263d4cea6d7a8c9eb3ad2` FOREIGN KEY (`permissionId`) REFERENCES `permission`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `user_roles_role` ADD CONSTRAINT `FK_5f9286e6c25594c6b88c108db77` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `user_roles_role` ADD CONSTRAINT `FK_4be2f7adf862634f5f803d246b8` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE CASCADE");
        await queryRunner.query("INSERT INTO `permission` (`permission`) values ('admin')")
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user_roles_role` DROP FOREIGN KEY `FK_4be2f7adf862634f5f803d246b8`");
        await queryRunner.query("ALTER TABLE `user_roles_role` DROP FOREIGN KEY `FK_5f9286e6c25594c6b88c108db77`");
        await queryRunner.query("ALTER TABLE `role_permissions_permission` DROP FOREIGN KEY `FK_bfbc9e263d4cea6d7a8c9eb3ad2`");
        await queryRunner.query("ALTER TABLE `role_permissions_permission` DROP FOREIGN KEY `FK_b36cb2e04bc353ca4ede00d87b9`");
        await queryRunner.query("DROP TABLE `user_roles_role`");
        await queryRunner.query("DROP TABLE `role_permissions_permission`");
        await queryRunner.query("DROP TABLE `role`");
        await queryRunner.query("DROP INDEX `IDX_573c75687effc7acabc05d4f6b` ON `permission`");
        await queryRunner.query("DROP TABLE `permission`");
    }

}
