import { z } from "zod";
export declare const BaseEmployeeSchema: z.ZodObject<{
    username: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
    cognitoId: z.ZodString;
    email: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    jobTitle: z.ZodString;
    startDate: z.ZodCoercedDate<unknown>;
    employmentType: z.ZodString;
    profilePictureUrl: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    departmentId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    teamId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export declare const EmployeeUpdateSchema: z.ZodObject<{
    username: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>>;
    email: z.ZodOptional<z.ZodString>;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    jobTitle: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    employmentType: z.ZodOptional<z.ZodString>;
    departmentId: z.ZodOptional<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    teamId: z.ZodOptional<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
}, z.core.$strip>;
export declare const EmployeeCreateSchema: z.ZodPipe<z.ZodObject<{
    username: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
    cognitoId: z.ZodString;
    email: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    jobTitle: z.ZodString;
    startDate: z.ZodCoercedDate<unknown>;
    employmentType: z.ZodString;
    profilePictureUrl: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    departmentId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    teamId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>, z.ZodTransform<{
    [k: string]: string | number | Date | undefined;
}, {
    username: string;
    cognitoId: string;
    email: string;
    firstName: string;
    lastName: string;
    jobTitle: string;
    startDate: Date;
    employmentType: string;
    profilePictureUrl?: string | undefined;
    endDate?: string | undefined;
    departmentId?: number | undefined;
    teamId?: number | undefined;
}>>;
//# sourceMappingURL=employee.d.ts.map