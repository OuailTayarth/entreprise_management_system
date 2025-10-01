import React from "react";
import Image from "next/image";
import { EmployeeResp } from "@shared/validation";

interface EmployeeCardProps {
  employee: EmployeeResp;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  return (
    <div className="mb-4 rounded-md bg-white shadow dark:bg-dark-secondary">
      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between">
          <h4 className="text-md font-bold dark:text-white">
            {employee.firstName} {employee.lastName}
          </h4>
          <div className="flex items-center text-gray-500 dark:text-neutral-500">
            <span className="ml-1 text-sm dark:text-neutral-400">
              {employee.jobTitle}
            </span>
          </div>
        </div>

        <div className="my-3 flex justify-between">
          <div className="text-sm text-gray-600 dark:text-neutral-500">
            {employee.email}
          </div>
          <div className="text-xs font-semibold dark:text-white">
            {employee.employmentType}
          </div>
        </div>

        <div className="mt-4 border-t border-gray-200 dark:border-stroke-dark" />

        <div className="mt-3 flex items-center justify-between">
          <div className="flex -space-x-[6px] overflow-hidden">
            {employee.profilePictureUrl && (
              <Image
                src={employee.profilePictureUrl}
                alt={`${employee.firstName} ${employee.lastName}`}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
              />
            )}
          </div>
          <div className="flex items-center text-gray-500 dark:text-neutral-500">
            <span className="ml-1 text-sm dark:text-neutral-400">
              {employee.departmentId ? "In department" : "No department"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
