import {Request, Response} from "express";
import Todo from "../../model/Todo";

const listTodo = async (req: Request, res: Response) => {
  const {page = 1, limit = 10, done = false} = req.query;
  /** Get all todo for user */
  const todos = await Todo.find({userId: res.locals.userId, status: done ? "done" : "todo"})
    .sort({creationDate: -1}) // Sort by creation date descending
    .skip((Number(page) - 1) * Number(limit))
    .limit(10);

  /** Send response. */
  if (todos) {
    return res.status(200).json({todos, message: "Todos fetched successfully!"});
  }
  return res.status(404).json({message: "Todos not found!"});
};

export default listTodo;
