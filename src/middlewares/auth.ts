import { NextFunction, Request, Response } from "express";
import { UserRole } from "../../generated/prisma/enums";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { prisma } from "../lib/prisma";

export default function auth(...roles: UserRole[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Token not found",
        });
      }

      const decoded = jwt.verify(
        token,
        config.jwt_secret as string,
      ) as JwtPayload;

      const user = await prisma.user.findUnique({
        where: {
          email: decoded.email,
        },
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      if (user.status !== "ACTIVE") {
        return res.status(401).json({
          success: false,
          message: "User is BANNED or not active",
        });
      }

      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
}
