import { UserRole } from "../../generated/prisma/enums";
import config from "../config";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

export default async function seedAdmin() {
  const hashedPassword = await bcrypt.hash(config.admin_password as string, 8);

  const adminData = {
    name: "ADMIN",
    email: config.admin_email as string,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  try {
    const isExist = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (isExist) {
      console.log("Admin with this email already exists");
      return;
    }

    const admin = await prisma.user.create({
      data: adminData,
    });

    const { password, ...newAdmin } = admin;
    console.log("Admin created successfully", newAdmin);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}

seedAdmin();
