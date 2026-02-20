/*
  Warnings:

  - You are about to drop the column `tutorProfileId` on the `tutorProfiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `tutorProfiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `tutorProfiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tutorProfiles" DROP CONSTRAINT "tutorProfiles_tutorProfileId_fkey";

-- DropIndex
DROP INDEX "tutorProfiles_tutorProfileId_key";

-- AlterTable
ALTER TABLE "tutorProfiles" DROP COLUMN "tutorProfileId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tutorProfiles_userId_key" ON "tutorProfiles"("userId");

-- AddForeignKey
ALTER TABLE "tutorProfiles" ADD CONSTRAINT "tutorProfiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
