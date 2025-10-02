/*
  Warnings:

  - Made the column `jobTitle` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `employmentType` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `reason` on table `Leave` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Employee" ALTER COLUMN "jobTitle" SET NOT NULL,
ALTER COLUMN "employmentType" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Leave" ALTER COLUMN "reason" SET NOT NULL;
