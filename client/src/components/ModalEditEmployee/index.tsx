"use client";

import React, { useState } from "react";
import Modal from "@/components/Modal";
import { normalizeSalary } from "@/lib/utils";
import { useUpdateEmployeeMutation } from "@/app/state/api";
import { EmployeeResp, UpdateEmployeeInput } from "@shared/validation";
import { toast } from "react-toastify";
import { Upload } from "lucide-react";
import { useImageUpload } from "@/hooks/useImageUpload";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  employee: EmployeeResp;
};

const ModalEditEmployee = ({ isOpen, onClose, employee }: Props) => {
  const [updateEmployee, { isLoading: isUpdating }] =
    useUpdateEmployeeMutation();

  const [formData, setFormData] = useState({
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    jobTitle: employee.jobTitle,
    salary: employee.salary,
    profilePictureUrl: employee.profilePictureUrl,
    startDate: employee.startDate?.split("T")[0] || "",
    employmentType: employee.employmentType || "",
  });

  const { uploadImage, isUploading } = useImageUpload();

  const handleFieldChange = (
    field: keyof UpdateEmployeeInput,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateEmployee({
        id: employee.id,
        body: {
          ...formData,
          salary: normalizeSalary(formData.salary),
          startDate: new Date(formData.startDate),
        },
      }).unwrap();

      toast.success("Employee updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to update employee");
      console.error("Update error:", error);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const key = await uploadImage(file);
    if (key) {
      handleFieldChange("profilePictureUrl", key);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Edit Employee">
      <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleFieldChange("firstName", e.target.value)}
            className="w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white"
            placeholder="First Name"
          />
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleFieldChange("lastName", e.target.value)}
            className="w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white"
            placeholder="Last Name"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            className="w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white"
            placeholder="Email"
          />
          <input
            type="text"
            value={formData.jobTitle}
            onChange={(e) => handleFieldChange("jobTitle", e.target.value)}
            className="w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white"
            placeholder="Job Title"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="number"
            value={formData.salary}
            onChange={(e) => handleFieldChange("salary", e.target.value)}
            className="w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white"
            placeholder="Annual Salary"
          />
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => handleFieldChange("startDate", e.target.value)}
            className="w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white"
          />
        </div>

        <select
          value={formData.employmentType}
          onChange={(e) => handleFieldChange("employmentType", e.target.value)}
          className="w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white"
        >
          <option value="">Employment Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contractor">Contractor</option>
          <option value="Intern">Intern</option>
        </select>

        <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-8 dark:border-gray-600">
          <label className="flex cursor-pointer flex-col items-center">
            <Upload className="mb-2 h-12 w-12 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formData.profilePictureUrl
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
          disabled={isUpdating || isUploading}
          className={`mt-4 flex w-full justify-center rounded-md px-4 py-2 text-white ${
            isUpdating || isUploading
              ? "cursor-not-allowed bg-gray-400"
              : "bg-blue-primary hover:bg-blue-600"
          }`}
        >
          {isUpdating || isUploading ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalEditEmployee;
