import {MigrationInterface, QueryRunner} from "typeorm";

export class customerModule1578572253963 implements MigrationInterface {
    name = 'customerModule1578572253963'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "gender" character varying NOT NULL, "userId" character varying NOT NULL, "idCardValue" character varying NOT NULL, "idCardType" character varying NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "customer"`, undefined);
    }

}
