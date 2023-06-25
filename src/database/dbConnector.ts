import mongoose from "mongoose";
import {configs} from "../configs/configs";

export async function main() {
  if (configs.dbHost) {
    await mongoose.connect(configs.dbHost);
  } else {
    throw new Error("DB host is not defined");
  }
}

export const createDBConnection = () => main().catch((err) => console.log(err));
