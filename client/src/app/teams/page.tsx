"use client";
import React, { useState } from "react";
import { useAppSelector } from "@/app/redux";
import Header from "@/components/Header";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetTeamsWithDetailsQuery } from "@/app/state/api";
import ModalNewTeam from "@/components/ModalNewTeam";
import { PlusSquare } from "lucide-react";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Team Name",
    width: 160,
  },
  {
    field: "departmentName",
    headerName: "Department",
    width: 160,
  },
  {
    field: "employeeCount",
    headerName: "Employees Numbers",
    width: 160,
    type: "number",
    align: "center",
  },

  {
    field: "collaborationScore",
    headerName: "Collaboration Score",
    width: 160,
  },
  {
    field: "productivityScore",
    headerName: "Productivity Score",
    width: 160,
  },
  {
    field: "qualityScore",
    headerName: "Quality Score",
    width: 160,
  },
];

const Teams = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const { data: teams, isLoading } = useGetTeamsWithDetailsQuery();
  console.log("teams", teams);
  const [isModalNewTeamOpen, setIsModalNewTeamOpen] = useState(false);

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
    <>
      <div className="h-[540px] w-full px-4 pb-8 xl:px-6">
        <div className="pt-5">
          <Header
            name="Team"
            buttonComponent={
              <button
                className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
                onClick={() => setIsModalNewTeamOpen(true)}
              >
                <PlusSquare className="mr-2 h-5 w-5" />
                New Team
              </button>
            }
          />
        </div>
        <DataGrid
          rows={teams || []}
          columns={columns}
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>

      <ModalNewTeam
        isOpen={isModalNewTeamOpen}
        onClose={() => setIsModalNewTeamOpen(false)}
      />
    </>
  );
};

export default Teams;
