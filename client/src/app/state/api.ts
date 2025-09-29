import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  CreateDepartmentInput,
  UpdateDepartmentInput,
  DepartmentResp,
} from "@shared/validation";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
});
