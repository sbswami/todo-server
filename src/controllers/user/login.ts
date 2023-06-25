import {Request, Response} from "express";
import User from "../../model/User";
import {decryptPassword, encryptJWT} from "../../encryption/encryption";

export const Login = async (req: Request, res: Response) => {
  const {username, password} = req.body;

  /** Check for empty fields. */
  if (!username || !password) return res.status(400).json({message: "Please fill all the fields!"});

  /** Find User in DB */
  const user = await User.findOne({username});

  /** Check if user exists. */
  if (!user || !user.username || !user.password) return res.status(404).json({message: "User not found!"});

  /** Check if password is correct. */
  if (decryptPassword(user.password) !== password) return res.status(401).json({message: "Invalid credentials!"});

  /** Remove password. */
  user.password = "";

  /** Send response. */
  return res
    .status(200)
    .json({user, jwt: encryptJWT({username, userId: user.id}), message: "User logged in successfully!"});
};
