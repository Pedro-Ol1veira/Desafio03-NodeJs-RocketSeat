/*
  Warnings:

  - You are about to drop the column `port` on the `Pet` table. All the data in the column will be lost.
  - Added the required column `size` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALL', 'MEDIUM', 'BIG');

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "port",
ADD COLUMN     "size" "Size" NOT NULL;

-- DropEnum
DROP TYPE "Port";
