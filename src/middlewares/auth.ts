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
        throw new Error("Token not found");
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
        throw new Error("User not found");
      }

      if (user.status !== "ACTIVE") {
        throw new Error("User is BANNED");
      }

      if (roles.length > 0 && !roles.includes(decoded.role)) {
        throw new Error("Unauthorized");
      }

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
}
