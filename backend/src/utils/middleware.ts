import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

interface UserPayload {
  username: string;
  csrf: string;
  id: string;
}

// Extender Request para incluir userId y csrfToken
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      csrfToken?: string;
    }
  }
}

export const withUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ error: "Token not found" });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as UserPayload;
    req.userId = decoded.id;
    req.csrfToken = decoded.csrf;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export const checkCSRF = (req: Request, res: Response, next: NextFunction) => {
  const csrfFromHeader = req.headers["x-csrf-token"];
  
  if (!csrfFromHeader || csrfFromHeader !== req.csrfToken) {
    return res.status(403).json({ error: "Invalid CSRF token" });
  }
  
  next();
};