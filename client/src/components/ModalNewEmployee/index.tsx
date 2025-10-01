import Modal from "@/components/Modal";
import { useCreateEmployeeMutation } from "@/app/state/api";
import React, { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  departmentId: string;
};

const ModalNewEmployee = ({ isOpen, onClose, departmentId }: Props) => {
  const [createEmployee, { isLoading }] = useCreateEmployeeMutation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [startDate, setStartDate] = useState("");

  const handleSubmit = async () => {
    if (!firstName || !lastName || !email || !jobTitle || !startDate) return;

    await createEmployee({
      firstName,
      lastName,
      email,
      jobTitle,
      startDate,
      departmentId: Number(departmentId),
    });
    onClose();
  };

  const isFormValid = () => {
    return firstName && lastName && email && jobTitle && startDate;
  };

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Employee">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className={inputStyles}
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          className={inputStyles}
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          className={inputStyles}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          className={inputStyles}
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            className={inputStyles}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating..." : "Create Employee"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewEmployee;
