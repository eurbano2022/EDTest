import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1688937213740 implements MigrationInterface {
    name = 'Migration1688937213740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`criteria\` DROP FOREIGN KEY \`FK_8f2dbd25ee83b4cb8c264101fe5\``);
        await queryRunner.query(`DROP INDEX \`IDX_8f2dbd25ee83b4cb8c264101fe\` ON \`criteria\``);
        await queryRunner.query(`DROP INDEX \`REL_8f2dbd25ee83b4cb8c264101fe\` ON \`criteria\``);
        await queryRunner.query(`ALTER TABLE \`criteria\` DROP COLUMN \`answerId\``);
        await queryRunner.query(`ALTER TABLE \`answer\` ADD \`criteriaId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`answer\` ADD UNIQUE INDEX \`IDX_cca6965b404f1d99a0f48578e2\` (\`criteriaId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_cca6965b404f1d99a0f48578e2\` ON \`answer\` (\`criteriaId\`)`);
        await queryRunner.query(`ALTER TABLE \`answer\` ADD CONSTRAINT \`FK_cca6965b404f1d99a0f48578e24\` FOREIGN KEY (\`criteriaId\`) REFERENCES \`criteria\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`answer\` DROP FOREIGN KEY \`FK_cca6965b404f1d99a0f48578e24\``);
        await queryRunner.query(`DROP INDEX \`REL_cca6965b404f1d99a0f48578e2\` ON \`answer\``);
        await queryRunner.query(`ALTER TABLE \`answer\` DROP INDEX \`IDX_cca6965b404f1d99a0f48578e2\``);
        await queryRunner.query(`ALTER TABLE \`answer\` DROP COLUMN \`criteriaId\``);
        await queryRunner.query(`ALTER TABLE \`criteria\` ADD \`answerId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_8f2dbd25ee83b4cb8c264101fe\` ON \`criteria\` (\`answerId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_8f2dbd25ee83b4cb8c264101fe\` ON \`criteria\` (\`answerId\`)`);
        await queryRunner.query(`ALTER TABLE \`criteria\` ADD CONSTRAINT \`FK_8f2dbd25ee83b4cb8c264101fe5\` FOREIGN KEY (\`answerId\`) REFERENCES \`answer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
