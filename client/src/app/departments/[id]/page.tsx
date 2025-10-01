"use client";

import React, { useState } from "react";
import DepartmentHeader from "@/app/departments/DepartmentHeader";
import EmployeesBoardView from "../EmployeesBoardView";
import EmployeesListView from "../EmployeesListView";
import EmployeesTableView from "../EmployeesTableView";
import ModalNewEmployee from "@/components/ModalNewEmployee";

type Props = {
  params: Promise<{ id: string }>;
};

const Department = ({ params }: Props) => {
  const { id } = React.use(params);
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewEmployeeOpen, setIsModalNewEmployeeOpen] = useState(false);

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
      />
      {activeTab === "Board" && (
        <EmployeesBoardView
          departmentId={id}
          setIsModalNewEmployeeOpen={setIsModalNewEmployeeOpen}
        />
      )}
      {activeTab === "List" && (
        <EmployeesListView
          departmentId={id}
          setIsModalNewEmployeeOpen={setIsModalNewEmployeeOpen}
        />
      )}
      {activeTab === "Table" && (
        <EmployeesTableView
          departmentId={id}
          setIsModalNewEmployeeOpen={setIsModalNewEmployeeOpen}
        />
      )}
    </div>
  );
};

export default Department;
