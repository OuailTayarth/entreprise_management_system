"use client";

import React from "react";
import Image from "next/image";
import { EmployeeResp } from "@shared/validation";
import { format } from "date-fns";
import { formatSalary, keyToUrl } from "@/lib/utils";

const EmployeeSearchCard = ({ employee }: { employee: EmployeeResp }) => {
  const formattedStartDate = employee?.startDate
    ? format(new Date(employee.startDate), "PP")
    : "N/A";
  const formattedEndDate = employee?.endDate
    ? format(new Date(employee.endDate), "PP")
    : "N/A";

  return (
    <div className="mb-4 rounded-xl bg-white shadow-lg dark:bg-dark-secondary">
      <div className="p-5 md:p-7">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
              {employee.employmentType}
            </span>
            {employee.endDate && (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                Inactive
              </span>
            )}
          </div>
        </div>

        <h3 className="mb-2 text-[16px] font-medium dark:text-white">
          {employee.firstName} {employee.lastName}
        </h3>

        <div className="mb-4 space-y-3">
          <div className="text-sm font-[400] text-gray-800 dark:text-gray-200">
            {employee.jobTitle}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="mb-1 font-medium text-gray-500 dark:text-gray-400 sm:mb-0 sm:mr-[6px]">
              Hire Date:
            </span>
            <span className="text-[12px] text-gray-800 dark:text-gray-200">
              {formattedStartDate}
            </span>
          </div>

          {employee.endDate ? (
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="mb-1 font-medium text-gray-500 dark:text-gray-400 sm:mb-0 sm:mr-[6px]">
                Termination Date:
              </span>
              <span className="text-[12px] text-gray-800 dark:text-gray-200">
                {formattedEndDate}
              </span>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="mb-1 font-medium text-gray-500 dark:text-gray-400 sm:mb-0 sm:mr-[6px]">
                Salary:
              </span>
              <span className="text-[12px] text-gray-800 dark:text-gray-200">
                {formatSalary(employee.salary)}
              </span>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex -space-x-2 overflow-hidden">
              {employee.profilePictureUrl ? (
                <div className="h-11 w-11 overflow-hidden rounded-full border-2 border-white dark:border-dark-tertiary">
                  <Image
                    src={keyToUrl(employee.profilePictureUrl)}
                    alt={`${employee.firstName} ${employee.lastName}`}
                    width={40}
                    height={40}
                    sizes="40px"
                    quality={90}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-200 dark:border-dark-tertiary">
                  <span className="font-medium text-gray-600 dark:text-gray-400">
                    {employee.firstName[0]}
                    {employee.lastName[0]}
                  </span>
                </div>
              )}
            </div>

            <div className="text-right">
              <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {employee.email}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSearchCard;
