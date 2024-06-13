import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import EnvConfig from "../config/envConfig";
export interface CustomRequest extends Request {
  userEmail?: string | JwtPayload;
}
const env = EnvConfig();
const SecretKey = env.secretKey;
const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization");
  if (!token) {
    res.status(401).json({ error: "Access denied" });
    return;
  }
  try {
    const newToken = token.split(" ")[1];
    const decoded = jwt.verify(newToken, SecretKey);
    req.userEmail = (decoded as JwtPayload).userEmail;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default verifyToken;
