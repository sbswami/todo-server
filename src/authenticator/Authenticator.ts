import {NextFunction, Request, Response} from "express";
import {APIResponse} from "../utils/APIResponse";
import User from "../model/User";
import {decryptJWT} from "../encryption/encryption";

/**
 * Authenticator middleware.
 */
export const authenticator = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader: string | undefined = req.headers.authorization as string | undefined;

  /** If no auth header */
  if (!authHeader) return APIResponse.unauthorized(res);

  const token = authHeader.split(" ")[1];

  const decoded = decryptJWT(token);

  /** If no token */
  if (!decoded) return APIResponse.unauthorized(res);

  const username = (decoded as {username: string; userId: string}).username;
  const userId = (decoded as {username: string; userId: string}).userId;

  /** If token is invalid */
  if (!username) return APIResponse.unauthorized(res);

  const user = await User.findOne({username, _id: userId});

  /** If user not found */
  if (!user) return APIResponse.unauthorized(res);

  /** If user found */
  res.locals.userId = user._id;
  res.locals.username = user.username;

  next();
};
