/*
  Warnings:

  - You are about to drop the column `place` on the `registrations` table. All the data in the column will be lost.
  - Added the required column `class` to the `registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course` to the `registrations` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Class" AS ENUM ('PLUS_ONE', 'PLUS_TWO');

-- CreateEnum
CREATE TYPE "Course" AS ENUM ('SCIENCE', 'COMMERCE', 'HUMANITIES', 'VHSC');

-- AlterTable
ALTER TABLE "registrations" DROP COLUMN "place",
ADD COLUMN     "class" "Class" NOT NULL,
ADD COLUMN     "course" "Course" NOT NULL;
