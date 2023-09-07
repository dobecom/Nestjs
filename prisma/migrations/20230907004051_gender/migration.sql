/*
  Warnings:

  - You are about to drop the column `sex` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "sex",
ADD COLUMN     "gender" TEXT;
