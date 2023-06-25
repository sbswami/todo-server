import express from "express";
import bodyParser from "body-parser";
import router from "./Router";
import { configs } from "./configs/configs";
import { createDBConnection } from "./database/dbConnector";

const app = express();
app.use(express.json());

/** Parse form data */
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use("/", router);

const main = async () => {
  await createDBConnection();
  app.listen(configs.port, () => {
    console.log(`listening on port ${configs.port}`);
  });
};

main();
