import {MigrationInterface, QueryRunner} from "typeorm";

export class addUniqueAndIndexToAccountNumber1577427227423 implements MigrationInterface {
    name = 'addUniqueAndIndexToAccountNumber1577427227423'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "UQ_ee66d482ebdf84a768a7da36b08" UNIQUE ("accountNumber")`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_ee66d482ebdf84a768a7da36b0" ON "account" ("accountNumber") `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_ee66d482ebdf84a768a7da36b0"`, undefined);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "UQ_ee66d482ebdf84a768a7da36b08"`, undefined);
    }

}
