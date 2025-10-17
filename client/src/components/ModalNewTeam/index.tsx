"use client";

import React, { useState } from "react";
import Modal from "@/components/Modal";
import { useGetDepartmentsQuery, useCreateTeamMutation } from "@/app/state/api";
import { toast } from "react-toastify";
import { CreateTeamInput } from "@shared/validation";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalNewTeam = ({ isOpen, onClose }: Props) => {
  const [newTeamData, setNewTeamData] = useState<CreateTeamInput>({
    name: "",
    departmentId: 0,
    collaborationScore: 0,
    productivityScore: 0,
    qualityScore: 0,
  });

  const { data: allDepartments } = useGetDepartmentsQuery();

  const [createTeam, { isLoading }] = useCreateTeamMutation();

  const handleFieldChange = (field: keyof CreateTeamInput, input: any) => {
    setNewTeamData((prev) => ({
      ...prev,
      [field]: input,
    }));
  };

  const handleSubmit = async () => {
    if (isLoading) return;

    if (!newTeamData.name || !newTeamData.departmentId) return;

    try {
      const result = await createTeam(newTeamData).unwrap();
      toast.success(`Team ${result.name} created successfully!`);
      onClose();
    } catch (error: any) {
      toast.error(
        "Failed to create team: " + (error.message || "Unknown error"),
      );
    }
  };

  const isFormValid = () => {
    return newTeamData.name && newTeamData.departmentId;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Team">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className="w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white"
          placeholder="Team Name"
          value={newTeamData.name}
          onChange={(e) => handleFieldChange("name", e.target.value)}
        />

        <select
          className="w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white"
          value={newTeamData.departmentId ?? ""}
          onChange={(e) =>
            handleFieldChange(
              "departmentId",
              e.target.value ? Number(e.target.value) : undefined,
            )
          }
        >
          <option value="">Select Department</option>
          {allDepartments?.map((dep) => (
            <option key={dep.id} value={dep.id}>
              {dep.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            isLoading || !isFormValid() ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={isLoading || !isFormValid()}
        >
          {isLoading ? "Creating..." : "Create Team"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewTeam;
