import Header from "@/components/Header";
import { Building, List, PlusSquare, Table } from "lucide-react";
import React, { useState } from "react";
import ModalNewEmployee from "@/components/ModalNewEmployee";
import { useGetDepartmentsQuery } from "@/app/state/api";

interface DepartmentHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  departmentId: string;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

// add debounce for performance

const DepartmentHeader: React.FC<DepartmentHeaderProps> = ({
  activeTab,
  setActiveTab,
  departmentId,
  searchTerm,
  onSearchChange,
}) => {
  const { data: departments } = useGetDepartmentsQuery();

  const department = departments?.find(
    (dep) => dep.id === Number(departmentId),
  );
  const departmentName = department?.name || "Department";

  const [isModalNewEmployeeOpen, setIsModalNewEmployeeOpen] = useState(false);

  return (
    <div className="px-4 xl:px-6">
      <ModalNewEmployee
        isOpen={isModalNewEmployeeOpen}
        onClose={() => setIsModalNewEmployeeOpen(false)}
        departmentId={departmentId}
      />
      <div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
        <Header
          name={`${departmentName} Department`}
          buttonComponent={
            <button
              className="flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewEmployeeOpen(true)}
            >
              <PlusSquare className="mr-2 h-5 w-5" /> New Employees
            </button>
          }
        />
      </div>

      <div className="flex flex-wrap-reverse gap-2 border-y border-gray-200 pb-[8px] pt-2 dark:border-stroke-dark md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <TabButton
            name="Board"
            icon={<Building className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="List"
            icon={<List className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Table"
            icon={<Table className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Employee"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="rounded-md border py-1 pl-10 pr-4 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
            />
            <List className="absolute left-3 top-2 h-4 w-4 text-gray-400 dark:text-neutral-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

type TabButtonProps = {
  name: string;
  icon: React.ReactNode;
  setActiveTab: (tabName: string) => void;
  activeTab: string;
};

const TabButton = ({ name, icon, setActiveTab, activeTab }: TabButtonProps) => {
  const isActive = activeTab === name;

  return (
    <button
      className={`relative flex items-center gap-2 px-1 py-2 text-gray-500 after:absolute after:-bottom-[9px] after:left-0 after:h-[1px] after:w-full hover:text-blue-600 dark:text-neutral-500 dark:hover:text-white sm:px-2 lg:px-4 ${
        isActive ? "text-blue-600 after:bg-blue-600 dark:text-white" : ""
      }`}
      onClick={() => setActiveTab(name)}
    >
      {icon}
      {name}
    </button>
  );
};

export default DepartmentHeader;
