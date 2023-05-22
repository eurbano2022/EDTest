import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1684738507902 implements MigrationInterface {
    name = 'Migration1684738507902'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`criteria\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`processAreaId\` int NULL, UNIQUE INDEX \`IDX_51e891968b4420f3bb869e9119\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`criteria\` ADD CONSTRAINT \`FK_03a4a655422b9603180347513ab\` FOREIGN KEY (\`processAreaId\`) REFERENCES \`process_area\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`criteria\` DROP FOREIGN KEY \`FK_03a4a655422b9603180347513ab\``);
        await queryRunner.query(`DROP INDEX \`IDX_51e891968b4420f3bb869e9119\` ON \`criteria\``);
        await queryRunner.query(`DROP TABLE \`criteria\``);
    }

}
