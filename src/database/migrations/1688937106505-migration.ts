import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1688937106505 implements MigrationInterface {
    name = 'Migration1688937106505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`criteria\` ADD \`answerId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`criteria\` ADD UNIQUE INDEX \`IDX_8f2dbd25ee83b4cb8c264101fe\` (\`answerId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_8f2dbd25ee83b4cb8c264101fe\` ON \`criteria\` (\`answerId\`)`);
        await queryRunner.query(`ALTER TABLE \`criteria\` ADD CONSTRAINT \`FK_8f2dbd25ee83b4cb8c264101fe5\` FOREIGN KEY (\`answerId\`) REFERENCES \`answer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`criteria\` DROP FOREIGN KEY \`FK_8f2dbd25ee83b4cb8c264101fe5\``);
        await queryRunner.query(`DROP INDEX \`REL_8f2dbd25ee83b4cb8c264101fe\` ON \`criteria\``);
        await queryRunner.query(`ALTER TABLE \`criteria\` DROP INDEX \`IDX_8f2dbd25ee83b4cb8c264101fe\``);
        await queryRunner.query(`ALTER TABLE \`criteria\` DROP COLUMN \`answerId\``);
    }

}
