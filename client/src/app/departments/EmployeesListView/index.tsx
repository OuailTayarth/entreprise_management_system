"use client";

import React from "react";
import EmployeeCardList from "@/components/EmployeeCardList";
import Header from "@/components/Header";
import { EmployeeResp } from "@shared/validation";

type Props = {
  setIsModalNewEmployeeOpen: (isOpen: boolean) => void;
  employees: EmployeeResp[];
  isLoading: boolean;
};

const EmployeesListView = ({
  setIsModalNewEmployeeOpen,
  employees,
  isLoading,
}: Props) => {
  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex h-64 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }
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
          <EmployeeCardList key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
};

export default EmployeesListView;
