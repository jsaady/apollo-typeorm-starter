import {MigrationInterface, QueryRunner} from "typeorm";

export class ClientIdentifier1546754320061 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD "clientIdentifier" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP COLUMN "clientIdentifier"`);
    }

}
