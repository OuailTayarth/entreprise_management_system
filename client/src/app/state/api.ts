import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  CreateDepartmentInput,
  UpdateDepartmentInput,
  DepartmentResp,
  CreateDocumentInput,
  UpdateDocumentInput,
  DocumentResp,
  CreateEmployeeInput,
  UpdateEmployeeInput,
  EmployeeResp,
  CreateLeaveInput,
  UpdateLeaveStatusInput,
  LeaveResp,
  CreateOnboardingInput,
  UpdateOnboardingInput,
  OnboardingResp,
  CreateTeamInput,
  UpdateTeamInput,
  TeamResp,
  SearchQueryInput,
  TeamDetailResp,
  PerformanceTrendsRes,
} from "@shared/validation";
import Employees from "../employees/page";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  reducerPath: "api",
  // tags for invalidation and refetching
  tagTypes: [
    "Departments",
    "Documents",
    "Employees",
    "Leaves",
    "OnboardingTasks",
    "Teams",
  ],
  endpoints: (build) => ({
    // ---Departments ---
    getDepartments: build.query<DepartmentResp[], void>({
      query: () => `/departments`,
      providesTags: ["Departments"],
    }),
    getDepartmentById: build.query<DepartmentResp, number>({
      query: (id) => `/departments/${id}`,
      providesTags: (result, error, id) => [{ type: "Departments", id }],
    }),

    createDepartment: build.mutation<DepartmentResp, CreateDepartmentInput>({
      query: (body) => ({
        url: `/departments`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Departments"],
    }),
    updateDepartment: build.mutation<
      DepartmentResp,
      { id: number; body: UpdateDepartmentInput }
    >({
      query: ({ id, body }) => ({
        url: `/departments/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Departments", id },
        "Departments",
      ],
    }),
    // ---Departments ---
    getDocuments: build.query<DocumentResp[], void>({
      query: () => `/documents`,
      providesTags: ["Documents"],
    }),

    createDocument: build.mutation<DocumentResp, CreateDocumentInput>({
      query: (body) => ({
        url: `/documents`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Documents"],
    }),

    updateDocument: build.mutation<
      DocumentResp,
      { id: number; body: UpdateDocumentInput }
    >({
      query: ({ id, body }) => ({
        url: `/documents/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (error, result, { id }) => [
        { type: "Documents", id },
        "Documents",
      ],
    }),
    deleteDocument: build.mutation<void, number>({
      query: (id) => ({
        url: `/documents/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Documents"],
    }),
    // --- Employees ---
    getEmployees: build.query<EmployeeResp[], void>({
      query: () => `/employees`,
      providesTags: ["Employees"],
    }),
    getEmployeeById: build.query<EmployeeResp, number>({
      query: (id) => `/employees/${id}`,
      providesTags: (result, error, id) => [{ type: "Employees", id }],
    }),
    getEmployeesByDepartmentId: build.query<EmployeeResp[], number>({
      query: (departmentId) => `/employees/by-department/${departmentId}`,
      providesTags: (result, error, departmentId) => [
        { type: "Employees", departmentId: `DEPT_${departmentId}` },
      ],
    }),
    getPerformanceTrends: build.query<PerformanceTrendsRes, void>({
      query: () => `/employees/performance-trends`,
      providesTags: ["Employees"],
    }),
    createEmployee: build.mutation<EmployeeResp, CreateEmployeeInput>({
      query: (body) => ({
        url: `/employees`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Employees"],
    }),
    searchEmployees: build.query<EmployeeResp[], SearchQueryInput>({
      query: (params) => ({
        url: `/employees/search`,
        params,
      }),
      providesTags: ["Employees"],
    }),
    searchEmployeesByDepartment: build.query<
      EmployeeResp[],
      { departmentId: number; q: string }
    >({
      query: ({ departmentId, q }) => ({
        url: `/employees/departments/${departmentId}/search`,
        params: { q },
      }),
      providesTags: ["Employees"],
    }),
    updateEmployee: build.mutation<
      EmployeeResp,
      { id: number; body: UpdateEmployeeInput }
    >({
      query: ({ id, body }) => ({
        url: `/employees/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Employees", id },
        "Employees",
      ],
    }),
    deleteEmployee: build.mutation<void, number>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employees"],
    }),

    // --- Leaves ---
    getLeaves: build.query<LeaveResp[], void>({
      query: () => `/leaves`,
      providesTags: ["Leaves"],
    }),
    getLeavesByEmployeeId: build.query<LeaveResp[], number>({
      query: (employeeId) => `/leaves/${employeeId}`,
      providesTags: (result, error, employeeId) => [
        { type: "Leaves", employeeId: `EMP_${employeeId}` },
      ],
    }),
    createLeave: build.mutation<LeaveResp, CreateLeaveInput>({
      query: (body) => ({
        url: `/leaves`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Leaves"],
    }),
    updateLeaveStatus: build.mutation<
      LeaveResp,
      { id: number; body: UpdateLeaveStatusInput }
    >({
      query: ({ id, body }) => ({
        url: `/leaves/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Leaves", id },
        "Leaves",
      ],
    }),
    // --- Onboarding Tasks ---
    getOnboardingTasks: build.query<OnboardingResp[], void>({
      query: () => `/onboarding-tasks`,
      providesTags: ["OnboardingTasks"],
    }),
    createOnboardingTask: build.mutation<OnboardingResp, CreateOnboardingInput>(
      {
        query: (body) => ({
          url: `/onboarding-tasks`,
          method: "POST",
          body,
        }),
        invalidatesTags: ["OnboardingTasks"],
      },
    ),
    updateOnboardingTask: build.mutation<
      OnboardingResp,
      { id: number; body: UpdateOnboardingInput }
    >({
      query: ({ id, body }) => ({
        url: `/onboarding-tasks/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "OnboardingTasks", id },
        "OnboardingTasks",
      ],
    }),
    // --- Teams ---
    getTeams: build.query<TeamResp[], void>({
      query: () => `/teams`,
      providesTags: ["Teams"],
    }),
    getTeamById: build.query<TeamResp, number>({
      query: (id) => `/teams/${id}`,
      providesTags: (result, error, id) => [{ type: "Teams", id }],
    }),
    createTeam: build.mutation<TeamResp, CreateTeamInput>({
      query: (body) => ({
        url: `/teams`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Teams"],
    }),
    getTeamsWithDetails: build.query<TeamDetailResp[], void>({
      query: () => `/teams/details`,
      providesTags: ["Teams"],
    }),
    updateTeam: build.mutation<TeamResp, { id: number; body: UpdateTeamInput }>(
      {
        query: ({ id, body }) => ({
          url: `/teams/${id}`,
          method: "PATCH",
          body,
        }),
        invalidatesTags: (result, error, { id }) => [
          { type: "Teams", id },
          "Teams",
        ],
      },
    ),
  }),
});

export const {
  // Departments
  useGetDepartmentsQuery,
  useGetDepartmentByIdQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  // Documents
  useGetDocumentsQuery,
  useCreateDocumentMutation,
  useUpdateDocumentMutation,
  useDeleteDocumentMutation,
  // Employees
  useGetEmployeesQuery,
  useGetPerformanceTrendsQuery,
  useGetEmployeesByDepartmentIdQuery,
  useGetEmployeeByIdQuery,
  useSearchEmployeesQuery,
  useSearchEmployeesByDepartmentQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  // Leaves
  useGetLeavesQuery,
  useGetLeavesByEmployeeIdQuery,
  useCreateLeaveMutation,
  useUpdateLeaveStatusMutation,
  // Onboarding Tasks
  useGetOnboardingTasksQuery,
  useCreateOnboardingTaskMutation,
  useUpdateOnboardingTaskMutation,
  // Teams
  useGetTeamsQuery,
  useGetTeamByIdQuery,
  useGetTeamsWithDetailsQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
} = api;
