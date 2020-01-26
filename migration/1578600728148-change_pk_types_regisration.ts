import {MigrationInterface, QueryRunner} from "typeorm";

export class changePkTypesRegisration1578600728148 implements MigrationInterface {
    name = 'changePkTypesRegisration1578600728148'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "registration_state" DROP CONSTRAINT "PK_e9cff5172cecf1764f3755900bd"`, undefined);
        await queryRunner.query(`ALTER TABLE "registration_state" DROP COLUMN "id"`, undefined);
        await queryRunner.query(`ALTER TABLE "registration_state" ADD "id" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "registration_state" ADD CONSTRAINT "PK_e9cff5172cecf1764f3755900bd" PRIMARY KEY ("id")`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "registration_state" DROP CONSTRAINT "PK_e9cff5172cecf1764f3755900bd"`, undefined);
        await queryRunner.query(`ALTER TABLE "registration_state" DROP COLUMN "id"`, undefined);
        await queryRunner.query(`ALTER TABLE "registration_state" ADD "id" SERIAL NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "registration_state" ADD CONSTRAINT "PK_e9cff5172cecf1764f3755900bd" PRIMARY KEY ("id")`, undefined);
    }

}
