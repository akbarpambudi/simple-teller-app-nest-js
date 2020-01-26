import {MigrationInterface, QueryRunner} from "typeorm";

export class changeFieldRegisration1578601015800 implements MigrationInterface {
    name = 'changeFieldRegisration1578601015800'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "registration_state" ALTER COLUMN "password" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "registration_state" ALTER COLUMN "name" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "registration_state" ALTER COLUMN "idCardType" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "registration_state" ALTER COLUMN "idCardNumber" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "registration_state" ALTER COLUMN "gender" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "registration_state" ALTER COLUMN "address" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "registration_state" ALTER COLUMN "customerId" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "registration_state" ALTER COLUMN "userId" DROP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "registration_state" ALTER COLUMN "userId" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "registration_state" ALTER COLUMN "customerId" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "registration_state" ALTER COLUMN "address" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "registration_state" ALTER COLUMN "gender" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "registration_state" ALTER COLUMN "idCardNumber" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "registration_state" ALTER COLUMN "idCardType" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "registration_state" ALTER COLUMN "name" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "registration_state" ALTER COLUMN "password" SET NOT NULL`, undefined);
    }

}
