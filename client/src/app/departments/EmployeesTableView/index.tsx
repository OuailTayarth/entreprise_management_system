"use client";

import { useAppSelector } from "@/app/redux";
import Header from "@/components/Header";
import {
  dataGridClassNames,
  dataGridSxStyles,
  formatSalary,
} from "@/lib/utils";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { EmployeeResp } from "@shared/validation";

import { format } from "date-fns";
import React from "react";

type Props = {
  setIsModalNewEmployeeOpen: (isOpen: boolean) => void;
  employees: EmployeeResp[];
  isLoading: boolean;
};

const columns: GridColDef[] = [
  {
    field: "firstName",
    headerName: "First Name",
    width: 140,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 120,
  },
  {
    field: "jobTitle",
    headerName: "Job Title",
    width: 150,
  },
  {
    field: "employmentType",
    headerName: "Employment Type",
    width: 180,
  },

  {
    field: "salary",
    headerName: "Salary",
    valueFormatter: (value) => (value ? formatSalary(value) : ""),
    width: 130,
  },

  {
    field: "startDate",
    headerName: "Start Date",
    valueFormatter: (value) => (value ? format(new Date(value), "P") : ""),
    width: 200,
  },
  {
    field: "endDate",
    headerName: "End Date",
    valueFormatter: (value) => (value ? format(new Date(value), "P") : ""),
    width: 130,
  },
];

const EmployeesTableView = ({
  setIsModalNewEmployeeOpen,
  employees,
  isLoading,
}: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
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
    <div className="h-[540px] w-full px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="Table"
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
      <DataGrid
        rows={employees}
        columns={columns}
        className={dataGridClassNames}
        sx={dataGridSxStyles(isDarkMode)}
      />
    </div>
  );
};

export default EmployeesTableView;
