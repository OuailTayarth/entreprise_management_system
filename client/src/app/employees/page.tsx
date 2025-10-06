"use client";
import Image from "next/image";
import { useGetEmployeesQuery } from "@/app/state/api";
import React from "react";
import Header from "@/components/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  dataGridClassNames,
  dataGridSxStyles,
  keyToUrl,
  formatSalary,
} from "@/lib/utils";
import { useAppSelector } from "@/app/redux";
import { EmployeeResp } from "@shared/validation";
import { format } from "date-fns";

export default function Employees() {
  const { data: employees, isLoading, isError } = useGetEmployeesQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });

  if (isLoading) return <div className="p-8">Loading...</div>;
  if (isError || !employees)
    return <div className="p-8">Error fetching employees</div>;

  const columns: GridColDef[] = [
    {
      field: "profilePicture",
      headerName: "Profile Picture",
      width: 120,
      renderCell: (params) => {
        const employee = params.row as EmployeeResp;
        if (!employee) return null;

        return (
          <div className="flex items-center justify-center">
            {employee.profilePictureUrl ? (
              <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white dark:border-dark-tertiary">
                <Image
                  src={keyToUrl(employee.profilePictureUrl)}
                  alt={employee.username || "Employee"}
                  width={100}
                  height={50}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-200 dark:border-dark-tertiary">
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  {employee.firstName?.[0] || ""}
                  {employee.lastName?.[0] || ""}
                </span>
              </div>
            )}
          </div>
        );
      },
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 120,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 130,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
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
      renderCell: (params) => (
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
          {params.value || "N/A"}
        </span>
      ),
    },
    {
      field: "salary",
      headerName: "Salary",
      valueFormatter: (value) =>
        value !== null && value !== undefined ? formatSalary(value) : "N/A",
      width: 110,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      valueFormatter: (value) =>
        value ? format(new Date(value), "PP") : "N/A",
      width: 120,
    },
    {
      field: "endDate",
      headerName: "End Date",
      valueFormatter: (value) =>
        value ? format(new Date(value), "PP") : "N/A",
      width: 120,
    },
  ];

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Employees" />
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={employees || []}
          columns={columns}
          getRowId={(row) => row.id}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10]}
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </div>
  );
}
