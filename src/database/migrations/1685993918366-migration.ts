import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1685993918366 implements MigrationInterface {
    name = 'Migration1685993918366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`criteria\` ADD \`parentId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`criteria\` ADD CONSTRAINT \`FK_9716fbcdc54ccf4134a0ef2d4ec\` FOREIGN KEY (\`parentId\`) REFERENCES \`criteria\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`criteria\` DROP FOREIGN KEY \`FK_9716fbcdc54ccf4134a0ef2d4ec\``);
        await queryRunner.query(`ALTER TABLE \`criteria\` DROP COLUMN \`parentId\``);
    }

}
