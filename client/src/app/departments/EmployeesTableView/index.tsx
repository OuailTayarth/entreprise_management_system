"use client";

import { useAppSelector } from "@/app/redux";
import Header from "@/components/Header";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { useGetEmployeesByDepartmentIdQuery } from "@/app/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";

type Props = {
  departmentId: string;
  setIsModalNewEmployeeOpen: (isOpen: boolean) => void;
};

const columns: GridColDef[] = [
  {
    field: "firstName",
    headerName: "First Name",
    width: 100,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 100,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "jobTitle",
    headerName: "Job Title",
    width: 150,
  },
  {
    field: "employmentType",
    headerName: "Employment Type",
    width: 120,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 130,
  },
  {
    field: "endDate",
    headerName: "End Date",
    width: 130,
  },
];

const EmployeesTableView = ({
  departmentId,
  setIsModalNewEmployeeOpen,
}: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const {
    data: employees,
    error,
    isLoading,
  } = useGetEmployeesByDepartmentIdQuery(Number(departmentId));

  if (isLoading) return <div>Loading...</div>;
  if (error || !employees)
    return <div>An error occurred while fetching employees</div>;

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
        rows={employees || []}
        columns={columns}
        className={dataGridClassNames}
        sx={dataGridSxStyles(isDarkMode)}
      />
    </div>
  );
};

export default EmployeesTableView;
