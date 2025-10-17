"use client";

import React, { useState, useEffect } from "react";
import DepartmentHeader from "@/app/departments/DepartmentHeader";
import EmployeesBoardView from "../EmployeesBoardView";
import EmployeesListView from "../EmployeesListView";
import EmployeesTableView from "../EmployeesTableView";
import ModalNewEmployee from "@/components/ModalNewEmployee";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "react-toastify";

import {
  useGetEmployeesByDepartmentIdQuery,
  useSearchEmployeesByDepartmentQuery,
} from "@/app/state/api";

type Props = {
  params: Promise<{ id: string }>;
};

const Department = ({ params }: Props) => {
  const { id } = React.use(params);

  const [activeTab, setActiveTab] = useState<string>("Board");
  const [isModalNewEmployeeOpen, setIsModalNewEmployeeOpen] =
    useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce<string>(searchTerm);

  const { data: allEmployees, isLoading: isAllLoading } =
    useGetEmployeesByDepartmentIdQuery(Number(id), { skip: !!searchTerm });

  const { data: searchResults, isLoading: isSearchingLoading } =
    useSearchEmployeesByDepartmentQuery(
      { q: searchTerm, departmentId: Number(id) },
      { skip: !debouncedSearchTerm },
    );

  const employees = searchTerm ? searchResults : allEmployees;
  const isLoading = searchTerm ? isSearchingLoading : isAllLoading;

  useEffect(() => {
    if (
      debouncedSearchTerm &&
      debouncedSearchTerm.length >= 3 &&
      !isLoading &&
      employees?.length === 0
    ) {
      toast.info(`No employees found for ${searchTerm}`);
    }
  }, [debouncedSearchTerm, isLoading, employees, searchTerm]);

  return (
    <div>
      <ModalNewEmployee
        isOpen={isModalNewEmployeeOpen}
        onClose={() => setIsModalNewEmployeeOpen(false)}
        departmentId={id}
      />
      <DepartmentHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        departmentId={id}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      {activeTab === "Board" && (
        <EmployeesBoardView
          departmentId={id}
          employees={employees || []}
          isLoading={isLoading}
          setIsModalNewEmployeeOpen={setIsModalNewEmployeeOpen}
        />
      )}
      {activeTab === "List" && (
        <EmployeesListView
          setIsModalNewEmployeeOpen={setIsModalNewEmployeeOpen}
          employees={employees || []}
          isLoading={isLoading}
        />
      )}
      {activeTab === "Table" && (
        <EmployeesTableView
          setIsModalNewEmployeeOpen={setIsModalNewEmployeeOpen}
          employees={employees || []}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default Department;
