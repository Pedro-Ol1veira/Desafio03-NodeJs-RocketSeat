/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Org` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Org` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Org" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Org_email_key" ON "Org"("email");
