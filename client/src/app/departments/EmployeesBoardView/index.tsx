"use client";

import React from "react";
import { EmployeeResp } from "@shared/validation";
import {
  useGetEmployeesByDepartmentIdQuery,
  useGetLeavesQuery,
} from "@/app/state/api";
import { User } from "lucide-react";
import { format } from "date-fns";
import { keyToUrl } from "@/lib/utils";

type BoardProps = {
  departmentId: string;
  setIsModalNewEmployeeOpen: (isOpen: boolean) => void;
};

const employeeStatus = ["Active", "On Leave", "Inactive"];

const EmployeesBoardView = ({
  departmentId,
  setIsModalNewEmployeeOpen,
}: BoardProps) => {
  const {
    data: employees,
    isLoading,
    error,
  } = useGetEmployeesByDepartmentIdQuery(Number(departmentId));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred while fetching employees</div>;

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
      {employeeStatus.map((status) => (
        <EmployeeColumn
          key={status}
          status={status}
          employees={employees || []}
          departmentId={departmentId}
          setIsModalNewEmployeeOpen={setIsModalNewEmployeeOpen}
        />
      ))}
    </div>
  );
};

type EmployeeColumnProps = {
  status: string;
  employees: EmployeeResp[];
  departmentId: string;
  setIsModalNewEmployeeOpen: (isOpen: boolean) => void;
};

const EmployeeColumn = ({
  status,
  employees,
  departmentId,
  setIsModalNewEmployeeOpen,
}: EmployeeColumnProps) => {
  const { data: allLeaves } = useGetLeavesQuery();
  // check if the the leaves data includes employeesId with status.leaves === "APPROVED" and date within the leave period
  const employeesOnLeaves = new Set<number>();

  if (allLeaves) {
    const now = new Date();
    allLeaves.forEach((leave) => {
      if (
        leave.status === "APPROVED" &&
        now >= new Date(leave.startDate) &&
        now <= new Date(leave.endDate)
      ) {
        employeesOnLeaves.add(leave.employeeId);
      }
    });
  }

  const employeesCount = employees.filter((emp) => {
    if (status === "Active") return !emp.endDate;
    if (status === "On Leave") return employeesOnLeaves.has(emp.id);
    if (status === "Inactive") return emp.endDate !== null;
    return false;
  }).length;

  const statusColor: any = {
    Active: "#2563EB",
    "On Leave": "#059669",
    Inactive: "#D97706",
  };

  return (
    <div className={`sl:py-4 rounded-lg py-2 xl:px-2`}>
      <div className="mb-3 flex w-full">
        <div
          className={`w-2 !bg-[${statusColor[status]}] rounded-s-lg`}
          style={{ backgroundColor: statusColor[status] }}
        />
        <div className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secondary">
          <h3 className="flex items-center text-[15px] font-medium dark:text-white">
            {status}{" "}
            <span
              className="ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none dark:bg-dark-tertiary"
              style={{ width: "1.5rem", height: "1.5rem" }}
            >
              {employeesCount}
            </span>
          </h3>
        </div>
      </div>

      {employees
        .filter((emp) => {
          if (status === "Active") return !emp.endDate;
          if (status === "On Leave") return employeesOnLeaves.has(emp.id);
          if (status === "Inactive") return emp.endDate !== null;
          return false;
        })
        .map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
    </div>
  );
};

type EmployeeCardProps = {
  employee: EmployeeResp;
};

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  const formattedStartDate = employee.startDate
    ? format(new Date(employee.startDate), "PP")
    : "N/A";
  const formattedEndDate = employee.endDate
    ? format(new Date(employee.endDate), "PP")
    : "N/A";

  return (
    <div
      className={`mb-4 rounded-xl bg-white shadow-lg transition-all dark:bg-dark-secondary`}
    >
      <div className="p-5 md:p-7">
        <div className="mb-4 flex items-start justify-between">
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
          <button className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-dark-tertiary">
            <User size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <h3 className="mb-2 text-[16px] font-medium dark:text-white">
          {employee.firstName} {employee.lastName}
        </h3>

        <div className="mb-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="text-sm font-[400] text-gray-800 dark:text-gray-200">
              {employee.jobTitle}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="mb-1 font-medium text-gray-500 dark:text-gray-400 sm:mb-0 sm:mr-[6px]">
              Start Date:
            </span>
            <span className="text-[14px] text-gray-800 dark:text-gray-200">
              {formattedStartDate}
            </span>
          </div>

          {employee.endDate && (
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="mb-1 font-medium text-gray-500 dark:text-gray-400 sm:mb-0 sm:mr-[8px]">
                End Date:
              </span>
              <span className="text-[14px] text-gray-800 dark:text-gray-200">
                {formattedEndDate}
              </span>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex -space-x-2 overflow-hidden">
              {employee.profilePictureUrl ? (
                <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white dark:border-dark-tertiary">
                  <img
                    src={keyToUrl(employee.profilePictureUrl)}
                    alt={`${employee.firstName} ${employee.lastName}`}
                    className="h-full w-full object-cover"
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

export default EmployeesBoardView;
