/*
  Warnings:

  - You are about to drop the column `managerId` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the column `managerId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `managerId` on the `Team` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Department" DROP CONSTRAINT "Department_managerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Employee" DROP CONSTRAINT "Employee_managerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Team" DROP CONSTRAINT "Team_managerId_fkey";

-- AlterTable
ALTER TABLE "public"."Department" DROP COLUMN "managerId";

-- AlterTable
ALTER TABLE "public"."Employee" DROP COLUMN "managerId";

-- AlterTable
ALTER TABLE "public"."Team" DROP COLUMN "managerId";

-- CreateTable
CREATE TABLE "public"."DepartmentManager" (
    "id" SERIAL NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "to" TIMESTAMP(3),

    CONSTRAINT "DepartmentManager_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DepartmentManager_departmentId_to_key" ON "public"."DepartmentManager"("departmentId", "to");

-- AddForeignKey
ALTER TABLE "public"."DepartmentManager" ADD CONSTRAINT "DepartmentManager_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "public"."Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DepartmentManager" ADD CONSTRAINT "DepartmentManager_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "public"."Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
