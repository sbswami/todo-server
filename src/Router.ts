import express from "express";
import {Login} from "./controllers/user/login";
import {authenticator} from "./authenticator/Authenticator";
import Signup from "./controllers/user/signup";
import createTodo from "./controllers/todo/create";
import updateTodo from "./controllers/todo/update";
import deleteTodo from "./controllers/todo/delete";
import listTodo from "./controllers/todo/list";
import getUser from "./controllers/user/get";

const router = express.Router();

router.get("/", (_, res) => res.send("Hello World!"));

/** User Routes */
router.post("/login", Login);
router.post("/signup", Signup);
router.get("/user", authenticator, getUser);

/** Todo Routes */
router.post("/todo", authenticator, createTodo);
router.put("/todo", authenticator, updateTodo);
router.delete("/todo", authenticator, deleteTodo);
router.get("/todo", authenticator, listTodo);

export default router;
