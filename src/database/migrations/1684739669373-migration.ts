import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1684739669373 implements MigrationInterface {
    name = 'Migration1684739669373';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`activity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`criteriaId\` int NULL, UNIQUE INDEX \`IDX_e0098522faf604f4f29ba54bba\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`resource\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`criteriaId\` int NULL, UNIQUE INDEX \`IDX_c8ed18ff47475e2c4a7bf59daa\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `ALTER TABLE \`activity\` ADD CONSTRAINT \`FK_3546a49fb8ce5872a0ad13a23e7\` FOREIGN KEY (\`criteriaId\`) REFERENCES \`criteria\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`resource\` ADD CONSTRAINT \`FK_7c354cdce9fcd3378a779a2cd23\` FOREIGN KEY (\`criteriaId\`) REFERENCES \`criteria\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`resource\` DROP FOREIGN KEY \`FK_7c354cdce9fcd3378a779a2cd23\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`activity\` DROP FOREIGN KEY \`FK_3546a49fb8ce5872a0ad13a23e7\``,
        );
        await queryRunner.query(
            `DROP INDEX \`IDX_c8ed18ff47475e2c4a7bf59daa\` ON \`resource\``,
        );
        await queryRunner.query(`DROP TABLE \`resource\``);
        await queryRunner.query(
            `DROP INDEX \`IDX_e0098522faf604f4f29ba54bba\` ON \`activity\``,
        );
        await queryRunner.query(`DROP TABLE \`activity\``);
    }
}
