import Cryptr from "cryptr";
import jwt from 'jsonwebtoken';
import {configs} from "../configs/configs";

export const encryptPassword = (password: string) => {
  const cryptr = new Cryptr(configs.passwordSecret);
  return cryptr.encrypt(password);
};

export const decryptPassword = (encryptedPassword: string) => {
  const cryptr = new Cryptr(configs.passwordSecret);
  return cryptr.decrypt(encryptedPassword);
};

export const encryptJWT = (payload: object): string => {
  return jwt.sign(payload, configs.jwtSecret);
};

export const decryptJWT = (encryptedJWT: string) => {
  return jwt.verify(encryptedJWT, configs.jwtSecret);
};
