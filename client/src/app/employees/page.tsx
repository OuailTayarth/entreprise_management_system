"use client";
import Image from "next/image";
import {
  useGetEmployeesQuery,
  useSearchEmployeesQuery,
  useUpdateDepartmentMutation,
  useDeleteEmployeeMutation,
} from "@/app/state/api";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Pencil, Trash } from "lucide-react";
import {
  dataGridClassNames,
  dataGridSxStyles,
  keyToUrl,
  formatSalary,
  normalizeSalary,
} from "@/lib/utils";
import { useAppSelector } from "@/app/redux";
import { EmployeeResp, CreateEmployeeInput } from "@shared/validation";
import { format } from "date-fns";
import { SearchBar } from "@/components/SearchBar";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "react-toastify";

export default function Employees() {
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editingEmployee, setEditingEmployee] = useState<EmployeeResp | null>(
    null,
  );
  const debouncedSearchTerm = useDebounce<string>(searchTerm);
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  //API data
  const {
    data: allEmployees,
    isLoading: isAllLoading,
    isError,
  } = useGetEmployeesQuery(undefined, { skip: !!searchTerm });
  const { data: searchResults, isLoading: isSearchingLoading } =
    useSearchEmployeesQuery({ q: searchTerm }, { skip: !debouncedSearchTerm });
  const [updateEmployee, { isLoading: isUploading }] =
    useUpdateDepartmentMutation();
  const [deleteEmployee, { isLoading: isDeleting }] =
    useDeleteEmployeeMutation();

  const employees = searchTerm ? searchResults : allEmployees;
  const isLoading = searchTerm ? isSearchingLoading : isAllLoading;

  useEffect(() => {
    if (
      debouncedSearchTerm &&
      debouncedSearchTerm.length >= 3 &&
      !isLoading &&
      employees?.length === 0
    ) {
      toast.info(`No employees found for "${searchTerm}"`);
    }
  }, [debouncedSearchTerm, isLoading, employees]);

  if (isLoading) return <div className="p-8">Loading...</div>;
  if (isError || !employees)
    return <div className="p-8">Error fetching employees</div>;

  const handleEdit = (employee: EmployeeResp) => {
    setEditingEmployee(employee);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (
    updatedEmployee: Partial<CreateEmployeeInput>,
  ) => {
    try {
      await updateEmployee({
        id: editingEmployee?.id,
        body: {
          ...updatedEmployee,
          salary: normalizeSalary(updatedEmployee.salary),
          startDate: new Date(updatedEmployee.startDate),
        },
      }).unwrap();

      toast.success("Employee updated successfully!");
      setIsEditModalOpen(false);
      setEditingEmployee(null);
    } catch (error) {
      toast.error("Failed to update employee");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteEmployee(id).unwrap();
      toast.success("Employee deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete employee");
      console.error("Delete error:", error);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "profilePicture",
      headerName: "Profile Picture",
      width: 120,
      renderCell: (params) => {
        const employee = params.row as EmployeeResp;
        if (!employee) return null;

        return (
          <div className="flex h-full w-full items-center justify-center p-0">
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
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => {
        const employee = params.row as EmployeeResp;

        const handleEdit = () => {
          // Handle edit logic here
          console.log("Edit employee:", employee.id);
        };

        const handleDelete = () => {
          // Handle delete logic here
          console.log("Delete employee:", employee.id);
        };

        return (
          <div className="h-full w-full flex-1 items-center justify-center gap-2 p-0">
            <button
              onClick={handleEdit}
              className="rounded-md p-1 hover:bg-gray-200 dark:hover:bg-dark-tertiary"
            >
              <Pencil className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={handleDelete}
              className="rounded-md p-1 hover:bg-red-100 dark:hover:bg-red-900/50"
            >
              <Trash className="h-4 w-4 text-red-600 dark:text-red-400" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Employees" />
      <div className="mb-4 flex flex-wrap justify-end gap-2 border-y border-gray-200 pb-[13px] pt-[13px] dark:border-stroke-dark md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>
      </div>
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
