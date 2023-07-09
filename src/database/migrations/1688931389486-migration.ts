import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1688931389486 implements MigrationInterface {
    name = 'Migration1688931389486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`company\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` text NOT NULL, \`type\` text NOT NULL, \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_a76c5cd486f7779bd9c319afd2\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`answer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`result\` varchar(255) NOT NULL, \`email\` text NOT NULL, \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`criteriaId\` int NULL, \`companyId\` int NULL, UNIQUE INDEX \`IDX_f27e4453c65a98a5c7706f6de3\` (\`result\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`practice\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`type\` text NOT NULL, \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`goalId\` int NULL, UNIQUE INDEX \`IDX_8e5c30003640d46e2c661eb775\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`goal\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`type\` text NOT NULL, \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_a1d0114dee50a26e9bb41b9505\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`goal_criterias_criteria\` (\`goalId\` int NOT NULL, \`criteriaId\` int NOT NULL, INDEX \`IDX_0f257e5708714baa5e542349a5\` (\`goalId\`), INDEX \`IDX_75e20106a5754c4ca11f8db2bf\` (\`criteriaId\`), PRIMARY KEY (\`goalId\`, \`criteriaId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`answer\` ADD CONSTRAINT \`FK_cca6965b404f1d99a0f48578e24\` FOREIGN KEY (\`criteriaId\`) REFERENCES \`criteria\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`answer\` ADD CONSTRAINT \`FK_bec528010b8ac23bd77840f2a5e\` FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`practice\` ADD CONSTRAINT \`FK_afa8072885a2502f10d597a3475\` FOREIGN KEY (\`goalId\`) REFERENCES \`goal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`goal_criterias_criteria\` ADD CONSTRAINT \`FK_0f257e5708714baa5e542349a53\` FOREIGN KEY (\`goalId\`) REFERENCES \`goal\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`goal_criterias_criteria\` ADD CONSTRAINT \`FK_75e20106a5754c4ca11f8db2bf2\` FOREIGN KEY (\`criteriaId\`) REFERENCES \`criteria\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`goal_criterias_criteria\` DROP FOREIGN KEY \`FK_75e20106a5754c4ca11f8db2bf2\``);
        await queryRunner.query(`ALTER TABLE \`goal_criterias_criteria\` DROP FOREIGN KEY \`FK_0f257e5708714baa5e542349a53\``);
        await queryRunner.query(`ALTER TABLE \`practice\` DROP FOREIGN KEY \`FK_afa8072885a2502f10d597a3475\``);
        await queryRunner.query(`ALTER TABLE \`answer\` DROP FOREIGN KEY \`FK_bec528010b8ac23bd77840f2a5e\``);
        await queryRunner.query(`ALTER TABLE \`answer\` DROP FOREIGN KEY \`FK_cca6965b404f1d99a0f48578e24\``);
        await queryRunner.query(`DROP INDEX \`IDX_75e20106a5754c4ca11f8db2bf\` ON \`goal_criterias_criteria\``);
        await queryRunner.query(`DROP INDEX \`IDX_0f257e5708714baa5e542349a5\` ON \`goal_criterias_criteria\``);
        await queryRunner.query(`DROP TABLE \`goal_criterias_criteria\``);
        await queryRunner.query(`DROP INDEX \`IDX_a1d0114dee50a26e9bb41b9505\` ON \`goal\``);
        await queryRunner.query(`DROP TABLE \`goal\``);
        await queryRunner.query(`DROP INDEX \`IDX_8e5c30003640d46e2c661eb775\` ON \`practice\``);
        await queryRunner.query(`DROP TABLE \`practice\``);
        await queryRunner.query(`DROP INDEX \`IDX_f27e4453c65a98a5c7706f6de3\` ON \`answer\``);
        await queryRunner.query(`DROP TABLE \`answer\``);
        await queryRunner.query(`DROP INDEX \`IDX_a76c5cd486f7779bd9c319afd2\` ON \`company\``);
        await queryRunner.query(`DROP TABLE \`company\``);
    }

}
