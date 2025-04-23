import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";

// JWT შექმნა
export const createJWT = (user: {
  id: string;
  username: string;
  email: string;
}) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET IS NOT DEFINED");
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return token;
};

// Express ტიპის გაფართოება
declare module "express-serve-static-core" {
  interface Request {
    user?: string | jwt.JwtPayload;
  }
}

// Middleware — ტოკენის ვალიდაცია
export const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  const token = bearer.split(" ")[1];

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Token invalid" });
    }

    return res.status(500).json({ message: "Something went wrong" });
  }
};

// პაროლის შედარება
export const comparePasswords = (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

// პაროლის ჰეშირება
export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};
