import {MigrationInterface, QueryRunner} from "typeorm";

export class addTransactionModule1577638040042 implements MigrationInterface {
    name = 'addTransactionModule1577638040042'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "transaction" ("id" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "description" character varying NOT NULL, "actor" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "transaction_split" ("id" SERIAL NOT NULL, "accountNumber" character varying NOT NULL, "amount" integer NOT NULL, "type" integer NOT NULL, "transactionId" character varying, CONSTRAINT "PK_62fb733e140cc3872a928ca62c1" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "transaction_split" ADD CONSTRAINT "FK_4cf34295631a45ccec2e7b59622" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "transaction_split" DROP CONSTRAINT "FK_4cf34295631a45ccec2e7b59622"`, undefined);
        await queryRunner.query(`DROP TABLE "transaction_split"`, undefined);
        await queryRunner.query(`DROP TABLE "transaction"`, undefined);
    }

}
