import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1688938248069 implements MigrationInterface {
    name = 'Migration1688938248069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_cca6965b404f1d99a0f48578e2\` ON \`answer\``);
        await queryRunner.query(`CREATE TABLE \`goal_criteria_criteria\` (\`goalId\` int NOT NULL, \`criteriaId\` int NOT NULL, INDEX \`IDX_b7d3ebb0e632765c48ed301ab7\` (\`goalId\`), INDEX \`IDX_95e77e0c4f60537173cbcb6983\` (\`criteriaId\`), PRIMARY KEY (\`goalId\`, \`criteriaId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`goal_criteria_criteria\` ADD CONSTRAINT \`FK_b7d3ebb0e632765c48ed301ab7b\` FOREIGN KEY (\`goalId\`) REFERENCES \`goal\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`goal_criteria_criteria\` ADD CONSTRAINT \`FK_95e77e0c4f60537173cbcb69830\` FOREIGN KEY (\`criteriaId\`) REFERENCES \`criteria\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`goal_criteria_criteria\` DROP FOREIGN KEY \`FK_95e77e0c4f60537173cbcb69830\``);
        await queryRunner.query(`ALTER TABLE \`goal_criteria_criteria\` DROP FOREIGN KEY \`FK_b7d3ebb0e632765c48ed301ab7b\``);
        await queryRunner.query(`DROP INDEX \`IDX_95e77e0c4f60537173cbcb6983\` ON \`goal_criteria_criteria\``);
        await queryRunner.query(`DROP INDEX \`IDX_b7d3ebb0e632765c48ed301ab7\` ON \`goal_criteria_criteria\``);
        await queryRunner.query(`DROP TABLE \`goal_criteria_criteria\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_cca6965b404f1d99a0f48578e2\` ON \`answer\` (\`criteriaId\`)`);
    }

}
