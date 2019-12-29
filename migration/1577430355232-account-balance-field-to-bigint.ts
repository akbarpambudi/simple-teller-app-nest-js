import {MigrationInterface, QueryRunner} from "typeorm";

export class accountBalanceFieldToBigint1577430355232 implements MigrationInterface {
    name = 'accountBalanceFieldToBigint1577430355232'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "balance"`, undefined);
        await queryRunner.query(`ALTER TABLE "account" ADD "balance" bigint NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "balance"`, undefined);
        await queryRunner.query(`ALTER TABLE "account" ADD "balance" integer NOT NULL`, undefined);
    }

}
