import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1687492348022 implements MigrationInterface {
    name = 'Migration1687492348022';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`process_area\` ADD \`weight\` int NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`criteria\` ADD \`weight\` int NOT NULL`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`criteria\` DROP COLUMN \`weight\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`process_area\` DROP COLUMN \`weight\``,
        );
    }
}
