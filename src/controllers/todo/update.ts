import {Request, Response} from "express";
import Todo from "../../model/Todo";

const updateTodo = async (req: Request, res: Response) => {
  const {_id, done, doneDate, title, description, undone} = req.body;

  /** Check for empty fields. */
  if (!_id) return res.status(400).json({message: "Please fill all the fields!"});

  /** Mark Todo as Done */
  if (done && doneDate) {
    const todo = await Todo.findOneAndUpdate({_id}, {status: "done", doneDate: doneDate}, {new: true});
    if (todo) {
      return res.status(200).json({todo, message: "Todo updated successfully!"});
    }
    return res.status(404).json({message: "Todo not found!"});
  }

  /** Mark Todo as Undone */
  if (undone) {
    const todo = await Todo.findOneAndUpdate({_id}, {status: "todo", doneDate: null}, {new: true});
    if (todo) {
      return res.status(200).json({todo, message: "Todo updated successfully!"});
    }
    return res.status(404).json({message: "Todo not found!"});
  }

  /** Update Todo */
  if (title || description) {
    const todo = await Todo.findOneAndUpdate({_id}, {title, description}, {new: true});
    if (todo) {
      return res.status(200).json({todo, message: "Todo updated successfully!"});
    }
    return res.status(404).json({message: "Todo not found!"});
  }

  /** If none of the above data available */
  if (!done && !doneDate && !title && !description && !undone)
    return res.status(400).json({message: "Please fill all the fields!"});

  return res.status(500).json({message: "Something went wrong!"});
};

export default updateTodo;
