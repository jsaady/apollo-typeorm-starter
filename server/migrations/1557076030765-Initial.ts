import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1557076030765 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `refresh_token` (`refreshToken` varchar(36) NOT NULL, `userId` int NOT NULL, `clientIdentifier` varchar(255) NOT NULL, `expiration` timestamp NOT NULL, `dateIssued` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`refreshToken`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `refresh_token` ADD CONSTRAINT `FK_8e913e288156c133999341156ad` FOREIGN KEY (`userId`) REFERENCES `user`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `refresh_token` DROP FOREIGN KEY `FK_8e913e288156c133999341156ad`");
        await queryRunner.query("DROP TABLE `refresh_token`");
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
