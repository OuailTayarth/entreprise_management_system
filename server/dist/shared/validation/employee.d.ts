import { z } from "zod";
export declare const EmployeeUpdateSchema: z.ZodObject<{
    username: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>>;
    email: z.ZodOptional<z.ZodString>;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    jobTitle: z.ZodOptional<z.ZodString>;
    salary: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    startDate: z.ZodOptional<z.ZodISODate>;
    employmentType: z.ZodOptional<z.ZodString>;
    departmentId: z.ZodOptional<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    teamId: z.ZodOptional<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
}, z.core.$strip>;
export declare const EmployeeCreateSchema: z.ZodObject<{
    username: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
    cognitoId: z.ZodString;
    email: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    jobTitle: z.ZodString;
    salary: z.ZodCoercedNumber<unknown>;
    startDate: z.ZodISODate;
    employmentType: z.ZodString;
    profilePictureUrl: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodISODate>;
    departmentId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    teamId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type CreateEmployeeInput = z.infer<typeof EmployeeCreateSchema>;
export type UpdateEmployeeInput = z.infer<typeof EmployeeUpdateSchema>;
export declare const EmployeeRespSchema: z.ZodObject<{
    username: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
    cognitoId: z.ZodString;
    email: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    jobTitle: z.ZodString;
    salary: z.ZodCoercedNumber<unknown>;
    startDate: z.ZodISODate;
    employmentType: z.ZodString;
    profilePictureUrl: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodISODate>;
    departmentId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    teamId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    id: z.ZodNumber;
    leaveBalance: z.ZodNumber;
}, z.core.$strip>;
export type EmployeeResp = z.infer<typeof EmployeeRespSchema>;
//# sourceMappingURL=employee.d.ts.map