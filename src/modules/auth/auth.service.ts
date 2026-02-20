import { User } from "../../../generated/prisma/client";
import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";
import config from "../../config";

const createUser = async (
  payload: Omit<User, "id" | "createdAt" | "updatedAt" | "status">,
) => {
  const hashedPassword = await bcrypt.hash(payload.password, 8);

  const result = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
  });

  const { password, ...newResult } = result;
  return newResult;
};

const loginUser = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordValid) {
    throw new Error("Password is incorrect");
  }

  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  };

  const token = jwt.sign(userData, config.jwt_secret as string, {
    expiresIn: "1d",
  });

  return { user, token };
};

export const AuthService = {
  createUser,
  loginUser,
};
