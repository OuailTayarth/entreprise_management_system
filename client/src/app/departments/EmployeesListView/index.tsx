"use client";

import React from "react";
import { useGetEmployeesByDepartmentIdQuery } from "@/app/state/api";
import EmployeeCard from "@/components/EmployeeCard";
import Header from "@/components/Header";

type Props = {
  departmentId: string;
  setIsModalNewEmployeeOpen: (isOpen: boolean) => void;
};

const EmployeesListView = ({
  departmentId,
  setIsModalNewEmployeeOpen,
}: Props) => {
  const {
    data: employees,
    isLoading,
    error,
  } = useGetEmployeesByDepartmentIdQuery(Number(departmentId));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred while fetching employees</div>;

  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="List"
          buttonComponent={
            <button
              className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewEmployeeOpen(true)}
            >
              Add Employee
            </button>
          }
          isSmallText
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {employees?.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
};

export default EmployeesListView;
