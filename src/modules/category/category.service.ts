import { Category } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createCategory = async (payload: Omit<Category, "id" | "createdAt">) => {
  const category = await prisma.category.findUnique({
    where: { categoryName: payload.categoryName },
  });

  if (category) throw new Error("Category already exists");

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
  const category = await prisma.category.findUnique({
    where: { id },
    include: { tutors: true },
  });
  if (!category) throw new Error("Category not found");

  if (category.tutors.length > 0) throw new Error("Category has tutors");

  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  return result;
};

export const CategoryService = {
  createCategory,
  getCategories,
  deleteCategory,
};
