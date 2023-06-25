import * as dotenv from 'dotenv';
dotenv.config();

export const configs = {
  port: process.env.PORT || 3000,
  flavor: process.env.FLAVOR || 'development',
  dbHost: process.env.DB_HOST,
  passwordSecret: process.env.PASSWORD_SECRET || 'secret',
  jwtSecret: process.env.JWT_SECRET || 'secret',
};