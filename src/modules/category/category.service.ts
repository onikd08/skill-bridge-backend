import { Category } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createCategory = async (payload: Omit<Category, "id" | "createdAt">) => {
  const result = await prisma.category.create({ data: payload });
  return result;
};

const getCategories = async () => {
  const result = await prisma.category.findMany({
    include: {
      tutors: {
        select: {
          hourlyRate: true,
          bio: true,
          experience: true,
          isFeatured: true,
          user: {
            select: {
              name: true,
              email: true,
              role: true,
              status: true,
            },
          },
        },
      },
    },
  });
  return result;
};

const deleteCategory = async (id: string) => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  if (!result) throw new Error("Category not found");
  return result;
};

export const CategoryService = {
  createCategory,
  getCategories,
  deleteCategory,
};
