import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1688942409803 implements MigrationInterface {
    name = 'Migration1688942409803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`company\` ADD \`size\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`company\` ADD \`industry\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company\` DROP COLUMN \`industry\``);
        await queryRunner.query(`ALTER TABLE \`company\` DROP COLUMN \`size\``);
        await queryRunner.query(`ALTER TABLE \`company\` ADD \`type\` text NOT NULL`);
    }

}
