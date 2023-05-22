import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
dotenv.config();

export const connectionSource = new DataSource({
    type: 'mysql',
    host: process.env.MY_SQL_HOST,
    port: parseInt(process.env.MY_SQL_PORT),
    username: process.env.MY_SQL_USER,
    password: process.env.MY_SQL_PASSWORD,
    database: process.env.MY_SQL_DB,
    logging: true,
    synchronize: false,
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/database/migrations/*.ts'],
});
