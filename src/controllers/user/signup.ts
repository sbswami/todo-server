import {Request, Response} from "express";
import User from "../../model/User";
import {encryptJWT, encryptPassword} from "../../encryption/encryption";

const Signup = async (req: Request, res: Response) => {
  const {username, password, email} = req.body;

  /** Check for empty fields. */
  if (!username || !password) return res.status(400).json({message: "Please fill all the fields!"});

  /** Check is username valid */
  if (username.length < 3) return res.status(400).json({message: "Username must be at least 3 characters long!"});

  /** Check is password valid */
  if (password.length < 6) return res.status(400).json({message: "Password must be at least 6 characters long!"});

  /** Check for Already user exists. */
  const existingUser = await User.findOne({username});
  if (existingUser) return res.status(409).json({message: "User already exists!"});

  /** Create new user. */
  const user = new User({
    username,
    password: encryptPassword(password),
    email,
  });

  /** Save user to database. */
  const savedUser = await user.save();

  
  /** Send response. */
  if (savedUser) {
    /** Remove password. */
    savedUser.password = "";
    return res
      .status(201)
      .json({user: savedUser, jwt: encryptJWT({username, userId: user.id}), message: "User created successfully!"});
  }
  return res.status(500).json({message: "Something went wrong!"});
};

export default Signup;
