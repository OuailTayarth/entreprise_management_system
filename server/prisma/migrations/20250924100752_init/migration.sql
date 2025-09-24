/*
  Warnings:

  - Made the column `jobTitle` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `employmentType` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `departmentId` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `teamId` on table `Employee` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Employee" DROP CONSTRAINT "Employee_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Employee" DROP CONSTRAINT "Employee_teamId_fkey";

-- AlterTable
ALTER TABLE "public"."Employee" ALTER COLUMN "jobTitle" SET NOT NULL,
ALTER COLUMN "employmentType" SET NOT NULL,
ALTER COLUMN "departmentId" SET NOT NULL,
ALTER COLUMN "teamId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Employee" ADD CONSTRAINT "Employee_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "public"."Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Employee" ADD CONSTRAINT "Employee_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "public"."Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
