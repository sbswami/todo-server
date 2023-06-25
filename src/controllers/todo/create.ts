import {Request, Response} from "express";
import Todo from "../../model/Todo";

const createTodo = async (req: Request, res: Response) => {
  const {title, description, date} = req.body;

  /** Check for empty fields. */
  if (!title || !date) return res.status(400).json({message: "Please fill all the fields!"});

  /** Create new todo. */
  const todo = new Todo({
    userId: res.locals.userId,
    title,
    description,
    status: "todo",
    creationDate: date,
  });

  /** Save todo to database. */
  const savedTodo = await todo.save();

  /** Send response. */
  if (savedTodo) {
    return res.status(201).json({todo: savedTodo, message: "Todo created successfully!"});
  }
  return res.status(500).json({message: "Something went wrong!"});
};

export default createTodo;
