import { DataSource } from 'typeorm';

import { Admin } from '../entity';

import * as dotenv from 'dotenv';

dotenv.config();

interface DatabaseInfoProps {
  HOST: string;
  PORT: string;
  USER_NAME: string;
  PASSWORD: string;
  NAME: string;
}

const DB_INFO: DatabaseInfoProps = {
  HOST: process.env.DATABASE_HOST as string,
  PORT: process.env.DATABASE_PORT as string,
  USER_NAME: process.env.DATABASE_USERNAME as string,
  PASSWORD: process.env.DATABASE_PASSWORD as string,
  NAME: process.env.DATABASE_NAME as string,
};

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_INFO.HOST,
  port: Number(DB_INFO.PORT),
  username: DB_INFO.USER_NAME,
  password: DB_INFO.PASSWORD,
  database: DB_INFO.NAME,
  synchronize: true,
  logging: false,
  entities: [Admin],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
