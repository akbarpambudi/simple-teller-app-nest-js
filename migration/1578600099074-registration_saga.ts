import {MigrationInterface, QueryRunner} from "typeorm";

export class registrationSaga1578600099074 implements MigrationInterface {
    name = 'registrationSaga1578600099074'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "registration_state" ("id" SERIAL NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "idCardType" character varying NOT NULL, "idCardNumber" character varying NOT NULL, "gender" character varying NOT NULL, "address" character varying NOT NULL, "customerId" character varying NOT NULL, "userId" character varying NOT NULL, "registrationStep" character varying NOT NULL, CONSTRAINT "PK_e9cff5172cecf1764f3755900bd" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "registration_state"`, undefined);
    }

}
