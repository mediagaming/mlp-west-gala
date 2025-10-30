/*
  Warnings:

  - You are about to drop the column `dateOfBirth` on the `registrations` table. All the data in the column will be lost.
  - Added the required column `dob` to the `registrations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "registrations" DROP COLUMN "dateOfBirth",
ADD COLUMN     "dob" TEXT NOT NULL;
