import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1688936351593 implements MigrationInterface {
    name = 'Migration1688936351593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`answer\` DROP FOREIGN KEY \`FK_cca6965b404f1d99a0f48578e24\``);
        await queryRunner.query(`ALTER TABLE \`answer\` DROP COLUMN \`criteriaId\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`answer\` ADD \`criteriaId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`answer\` ADD CONSTRAINT \`FK_cca6965b404f1d99a0f48578e24\` FOREIGN KEY (\`criteriaId\`) REFERENCES \`criteria\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
