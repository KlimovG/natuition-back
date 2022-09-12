import { DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const {
    DB_USER,
    DB_HOST,
    DB_PASSWORD,
    DB_PORT,
    DEV_DB,
    PROD_DB,
    NODE_ENV,
} = process.env;

const dir = NODE_ENV === 'production' ? 'build' : 'src';

const config: DataSourceOptions = {
    type: 'mysql',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASSWORD,
    database: NODE_ENV === 'production' ? PROD_DB : DEV_DB,
    synchronize: NODE_ENV !== 'production',
    logging: false,
    entities: [`${dir}/database/entity/**/*.{ts,js}`],
    migrations: [`${dir}/database/migrations/**/*.{ts,js}`],
    subscribers: [`${dir}/database/subscriber/**/*.{ts,js}`]
};

export = config;