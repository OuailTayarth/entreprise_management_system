import Modal from "@/components/Modal";
import { useCreateEmployeeMutation, useGetTeamsQuery } from "@/app/state/api";
import React, { useState } from "react";
import { CreateEmployeeInput } from "@shared/validation";
import { Upload } from "lucide-react";
import { normalizeSalary } from "@/lib/utils";
import { toast } from "react-toastify";
import { useImageUpload } from "@/hooks/useImageUpload";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  departmentId: string;
};

const ModalNewEmployee = ({ isOpen, onClose, departmentId }: Props) => {
  const [createEmployee, { isLoading }] = useCreateEmployeeMutation();
  const { data: allTeams } = useGetTeamsQuery();

  const { uploadImage, isUploading } = useImageUpload();

  const [newEmployeeData, setNewEmployeeData] = useState<CreateEmployeeInput>({
    firstName: "",
    lastName: "",
    username: "",
    salary: 0,
    email: "",
    jobTitle: "",
    startDate: new Date(),
    profilePictureUrl: "",
    employmentType: "",
    departmentId: Number(departmentId),
    teamId: undefined,
  });

  const handleFieldChange = <K extends keyof CreateEmployeeInput>(
    field: K,
    value: CreateEmployeeInput[K],
  ) => {
    setNewEmployeeData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const key = await uploadImage(file);
    if (key) {
      handleFieldChange("profilePictureUrl", key);
    }
  };

  const handleSubmit = async () => {
    if (isLoading) return;
    if (
      !newEmployeeData.firstName ||
      !newEmployeeData.lastName ||
      !newEmployeeData.email ||
      !newEmployeeData.jobTitle ||
      !newEmployeeData.startDate ||
      !newEmployeeData.salary
    )
      return;

    const generatedUserName = `${newEmployeeData.firstName.toLocaleLowerCase()}.${newEmployeeData.lastName.toLocaleLowerCase()}`;
    const formattedStartDate = new Date(newEmployeeData.startDate);

    // prepare the body data for the API
    const newEmployee = {
      firstName: newEmployeeData.firstName,
      lastName: newEmployeeData.lastName,
      username: generatedUserName,
      salary: normalizeSalary(newEmployeeData.salary),
      email: newEmployeeData.email,
      jobTitle: newEmployeeData.jobTitle,
      startDate: formattedStartDate,
      employmentType: newEmployeeData.employmentType,
      profilePictureUrl: newEmployeeData.profilePictureUrl,
      teamId: newEmployeeData.teamId,
      departmentId: newEmployeeData.departmentId,
    };

    try {
      const result = await createEmployee(newEmployee).unwrap();
      toast.success(
        `Employee ${result.firstName} ${result.lastName} created successfully!`,
      );
      onClose();
    } catch (error: any) {
      toast.error(
        "Failed to create employee:" + (error.message || "Unknown error"),
      );
    }

    onClose();
  };

  const isFormValid = () => {
    return (
      newEmployeeData.firstName &&
      newEmployeeData.lastName &&
      newEmployeeData.email &&
      newEmployeeData.jobTitle &&
      newEmployeeData.startDate &&
      newEmployeeData.salary
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Employee">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            className="w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none"
            placeholder="First Name"
            value={newEmployeeData.firstName}
            onChange={(e) => handleFieldChange("firstName", e.target.value)}
          />
          <input
            type="text"
            className="w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none"
            placeholder="Last Name"
            value={newEmployeeData.lastName}
            onChange={(e) => handleFieldChange("lastName", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            className="w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none"
            placeholder="Job Title"
            value={newEmployeeData.jobTitle}
            onChange={(e) => handleFieldChange("jobTitle", e.target.value)}
          />

          <select
            className="w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white"
            value={newEmployeeData.employmentType}
            onChange={(e) =>
              handleFieldChange("employmentType", e.target.value)
            }
          >
            <option value="">Employment Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contractor">Contractor</option>
            <option value="Intern">Intern</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="email"
            className="w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none"
            placeholder="Email"
            value={newEmployeeData.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
          />

          <input
            type="number"
            className="w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none"
            placeholder="Annual Salary"
            value={newEmployeeData.salary}
            onChange={(e) => handleFieldChange("salary", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="date"
            className="w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none"
            value={
              newEmployeeData.startDate
                ? newEmployeeData.startDate.toISOString().split("T")[0]
                : ""
            }
            onChange={(e) =>
              handleFieldChange("startDate", new Date(e.target.value))
            }
          />

          <select
            className="w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white"
            value={newEmployeeData.teamId ?? ""}
            onChange={(e) =>
              handleFieldChange(
                "teamId",
                e.target.value ? Number(e.target.value) : undefined,
              )
            }
          >
            <option value="">Select Team</option>
            {allTeams?.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-8 dark:border-gray-600">
          <label className="flex cursor-pointer flex-col items-center">
            <Upload className="mb-2 h-12 w-12 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {newEmployeeData.profilePictureUrl
                ? "Change Picture"
                : "Upload Profile Picture"}
            </span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleUpload}
            />
          </label>
        </div>

        <button
          type="submit"
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            isUploading || !isFormValid() || isLoading
              ? "cursor-not-allowed opacity-50"
              : ""
          }`}
          disabled={isUploading || !isFormValid() || isLoading}
        >
          {isUploading
            ? " Uploading..."
            : isLoading
              ? "Creating..."
              : "Create Employee"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewEmployee;
