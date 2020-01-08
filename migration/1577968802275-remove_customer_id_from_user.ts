import {MigrationInterface, QueryRunner} from "typeorm";

export class removeCustomerIdFromUser1577968802275 implements MigrationInterface {
    name = 'removeCustomerIdFromUser1577968802275'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "customerId"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ADD "customerId" character varying NOT NULL`, undefined);
    }

}
