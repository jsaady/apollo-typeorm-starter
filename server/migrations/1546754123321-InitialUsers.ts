import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialUsers1546754123321 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_token" ("refreshToken" uuid NOT NULL DEFAULT uuid_generate_v4(), "expiration" TIMESTAMP NOT NULL, "dateIssued" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_428e14ded7299edfcf58918beaf" PRIMARY KEY ("refreshToken"))`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "user"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_8e913e288156c133999341156ad"`);
        await queryRunner.query(`DROP TABLE "refresh_token"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
