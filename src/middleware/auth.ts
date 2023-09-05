import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  user?: any; // Customize the user object type based on your JWT payload
}

const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json({
      success: false,
      error: "Access denied. No token provided",
    });

  try {
    const decoded = jwt.verify(token, "jwtPrivateKey");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "Either key is incorrect or token is expired",
    });
  }
};

export default auth;
