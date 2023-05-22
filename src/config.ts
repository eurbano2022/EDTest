import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
    return {
        MY_SQL_HOST: process.env.MY_SQL_HOST,
        MY_SQL_DB: process.env.MY_SQL_DB,
        MY_SQL_USER: process.env.MY_SQL_USER,
        MY_SQL_PASSWORD: process.env.MY_SQL_PASSWORD,
        MY_SQL_PORT: parseInt(process.env.MY_SQL_PORT),
    };
});
