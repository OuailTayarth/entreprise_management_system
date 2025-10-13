-- DropForeignKey
ALTER TABLE "public"."DepartmentManager" DROP CONSTRAINT "DepartmentManager_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Document" DROP CONSTRAINT "Document_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Document" DROP CONSTRAINT "Document_uploadedById_fkey";

-- DropForeignKey
ALTER TABLE "public"."Leave" DROP CONSTRAINT "Leave_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OnboardingTask" DROP CONSTRAINT "OnboardingTask_assigneeId_fkey";

-- AlterTable
ALTER TABLE "public"."Employee" ADD COLUMN     "performanceScore" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."Team" ADD COLUMN     "collaborationScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "productivityScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "qualityScore" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "public"."DepartmentManager" ADD CONSTRAINT "DepartmentManager_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "public"."Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Document" ADD CONSTRAINT "Document_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "public"."Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Document" ADD CONSTRAINT "Document_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "public"."Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Leave" ADD CONSTRAINT "Leave_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "public"."Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OnboardingTask" ADD CONSTRAINT "OnboardingTask_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "public"."Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
