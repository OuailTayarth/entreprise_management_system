/*
  Warnings:

  - Added the required column `salary` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Employee" ADD COLUMN     "salary" DECIMAL(10,2) NOT NULL;
