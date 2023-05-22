import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1684735863053 implements MigrationInterface {
    name = 'Migration1684735863053';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`process_area\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`levelId\` int NULL, UNIQUE INDEX \`IDX_a8c992943e2ce3e9c8b8fa2093\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `ALTER TABLE \`process_area\` ADD CONSTRAINT \`FK_44ece4aab156b6615e6dccd1f29\` FOREIGN KEY (\`levelId\`) REFERENCES \`level\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`process_area\` DROP FOREIGN KEY \`FK_44ece4aab156b6615e6dccd1f29\``,
        );
        await queryRunner.query(
            `DROP INDEX \`IDX_a8c992943e2ce3e9c8b8fa2093\` ON \`process_area\``,
        );
        await queryRunner.query(`DROP TABLE \`process_area\``);
    }
}
