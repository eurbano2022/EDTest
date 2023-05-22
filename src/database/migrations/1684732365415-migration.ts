import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1684732365415 implements MigrationInterface {
    name = 'Migration1684732365415';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`level\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_8ca955843d28dd01385e8a9588\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP INDEX \`IDX_8ca955843d28dd01385e8a9588\` ON \`level\``,
        );
        await queryRunner.query(`DROP TABLE \`level\``);
    }
}
