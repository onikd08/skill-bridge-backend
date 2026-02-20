-- CreateTable
CREATE TABLE "tutorProfiles" (
    "id" TEXT NOT NULL,
    "bio" TEXT,
    "experience" INTEGER NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tutorProfileId" TEXT NOT NULL,

    CONSTRAINT "tutorProfiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tutorProfiles_tutorProfileId_key" ON "tutorProfiles"("tutorProfileId");

-- AddForeignKey
ALTER TABLE "tutorProfiles" ADD CONSTRAINT "tutorProfiles_tutorProfileId_fkey" FOREIGN KEY ("tutorProfileId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
