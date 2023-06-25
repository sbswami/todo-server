import {Request, Response} from "express";
import User from "../../model/User";

const getUser = async (req: Request, res: Response) => {
  const user = await User.findById(res.locals.userId);

  if (!user) return res.status(404).json({message: "User not found!"});

  user.password = "";
  return res.status(200).json({user, message: "User found!"});
};

export default getUser;
