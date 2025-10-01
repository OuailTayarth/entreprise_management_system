"use client";

import React from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { EmployeeResp } from "@shared/validation";
import { useGetEmployeesByDepartmentIdQuery } from "@/app/state/api";
import { Briefcase, User, Users } from "lucide-react";
import { format } from "date-fns";

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
    <DndProvider backend={HTML5Backend}>
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
    </DndProvider>
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
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "employee",
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const employeesCount = employees.filter((emp) => {
    if (status === "Active") return !emp.endDate;
    if (status === "On Leave") return false; // You'll need to implement your own logic here
    if (status === "Inactive") return emp.endDate !== null;
    return false;
  }).length;

  const statusColor: any = {
    Active: "#2563EB",
    OnLeave: "#059669",
    Inactive: "#D97706",
  };

  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`sl:py-4 rounded-lg py-2 xl:px-2 ${isOver ? "bg-blue-100 dark:bg-neutral-950" : ""}`}
    >
      <div className="mb-3 flex w-full">
        <div
          className={`w-2 !bg-[${statusColor[status]}] rounded-s-lg`}
          style={{ backgroundColor: statusColor[status] }}
        />
        <div className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secondary">
          <h3 className="flex items-center text-lg font-semibold dark:text-white">
            {status}{" "}
            <span
              className="ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none dark:bg-dark-tertiary"
              style={{ width: "1.5rem", height: "1.5rem" }}
            >
              {employeesCount}
            </span>
          </h3>
          <div className="flex items-center gap-1">
            <button className="flex h-6 w-5 items-center justify-center dark:text-neutral-500">
              <Users size={26} />
            </button>
            <button
              className="flex h-6 w-6 items-center justify-center rounded bg-gray-200 dark:bg-dark-tertiary dark:text-white"
              onClick={() => setIsModalNewEmployeeOpen(true)}
            >
              <Briefcase size={16} />
            </button>
          </div>
        </div>
      </div>

      {employees
        .filter((emp) => {
          if (status === "Active") return !emp.endDate;
          if (status === "On Leave") return false;
          if (status === "Inactive") return !!emp.endDate;
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
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "employee",
    item: { id: employee.id },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const formattedStartDate = employee.startDate
    ? format(new Date(employee.startDate), "P")
    : "";
  const formattedEndDate = employee.endDate
    ? format(new Date(employee.endDate), "P")
    : "";

  return (
    <div
      ref={(instance) => {
        drag(instance);
      }}
      className={`mb-4 rounded-md bg-white shadow dark:bg-dark-secondary ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            <div className="rounded-full bg-blue-100 px-2 py-1 text-xs">
              {employee.employmentType}
            </div>
          </div>
          <button className="flex h-6 w-4 flex-shrink-0 items-center justify-center dark:text-neutral-500">
            <Users size={26} />
          </button>
        </div>

        <div className="my-3 flex justify-between">
          <h4 className="text-md font-bold dark:text-white">
            {employee.firstName} {employee.lastName}
          </h4>
        </div>

        <div className="text-xs text-gray-500 dark:text-neutral-500">
          {formattedStartDate && <span>{formattedStartDate} - </span>}
          {formattedEndDate && <span>{formattedEndDate}</span>}
        </div>
        <p className="text-sm text-gray-600 dark:text-neutral-500">
          {employee.jobTitle}
        </p>
        <div className="mt-4 border-t border-gray-200 dark:border-stroke-dark" />

        <div className="mt-3 flex items-center justify-between">
          <div className="flex -space-x-[6px] overflow-hidden">
            {employee.profilePictureUrl && (
              <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-white dark:border-dark-secondary">
                <img
                  src={employee.profilePictureUrl}
                  alt={`${employee.firstName} ${employee.lastName}`}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
          <div className="flex items-center text-gray-500 dark:text-neutral-500">
            <span className="ml-1 text-sm dark:text-neutral-400">
              {employee.email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesBoardView;
