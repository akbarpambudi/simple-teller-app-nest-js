import {MigrationInterface, QueryRunner} from "typeorm";

export class schemaInitialization1576590709442 implements MigrationInterface {
    name = 'schemaInitialization1576590709442'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "account_number_sequence" ("id" SERIAL NOT NULL, "sequenceNumber" integer NOT NULL, "prefix" character varying NOT NULL, "totalLength" integer NOT NULL, CONSTRAINT "UQ_844d03b100aa6ab1bba81b1fbb9" UNIQUE ("prefix"), CONSTRAINT "PK_66257121c29e5f3e8f2c271c3bd" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "account" ("id" character varying NOT NULL, "accountNumber" character varying(50) NOT NULL, "balance" integer NOT NULL, "customerId" character varying NOT NULL, "creator" character varying NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "account"`, undefined);
        await queryRunner.query(`DROP TABLE "account_number_sequence"`, undefined);
    }

}
