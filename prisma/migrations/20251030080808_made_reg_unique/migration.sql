/*
  Warnings:

  - A unique constraint covering the columns `[mobile,dob]` on the table `registrations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "registrations_unique_mobile_dob_idx" ON "registrations"("mobile", "dob");
