import {Request, Response} from "express";
import Todo from "../../model/Todo";

const deleteTodo = async (req: Request, res: Response) => {
  const {_id} = req.body;

  /** Delete TODO */
  const todo = await Todo.findByIdAndDelete(_id);

  /** Send response. */
  if (todo) {
    return res.status(200).json({todo, message: "Todo deleted successfully!"});
  }
  return res.status(404).json({message: "Todo not found!"});
};

export default deleteTodo;
