import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'mysql2';
import * as mysql from 'mysql2/promise';

import config from '../config';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [config.KEY],
            useFactory: (configService: ConfigType<typeof config>) => {
                return {
                    type: 'mysql',
                    host: configService.MY_SQL_HOST,
                    port: configService.MY_SQL_PORT,
                    username: configService.MY_SQL_USER,
                    password: configService.MY_SQL_PASSWORD,
                    database: configService.MY_SQL_DB,
                    synchronize: false,
                    autoLoadEntities: true,
                };
            },
        }),
    ],
    providers: [
        {
            provide: 'MY_SQL',
            useFactory: (configService: ConfigType<typeof config>) => {
                const client: ConnectionOptions = {
                    host: configService.MY_SQL_HOST,
                    user: configService.MY_SQL_USER,
                    password: configService.MY_SQL_PASSWORD,
                    database: configService.MY_SQL_DB,
                    port: configService.MY_SQL_PORT,
                };
                return mysql.createConnection(client);
            },
            inject: [config.KEY],
        },
    ],
    exports: ['MY_SQL'],
})
export class DatabaseModule {}
