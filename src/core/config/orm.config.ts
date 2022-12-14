import { DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const { DB_USER, DB_HOST, DB_PASSWORD, DB_PORT, DB_NAME, NODE_ENV } =
  process.env;

const dir = NODE_ENV === 'production' ? 'build' : 'src';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: NODE_ENV !== 'production',
  connectorPackage: 'mysql2',
  entities: [`${dir}/database/entity/**/*.{ts,js}`],
  migrations: [`${dir}/database/migrations/**/*.{ts,js}`],
  subscribers: [`${dir}/database/subscriber/**/*.{ts,js}`],
};
