import { z } from "zod";
export declare const EmployeeCreateSchema: z.ZodObject<{
    username: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
    cognitoId: z.ZodString;
    email: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    jobTitle: z.ZodString;
    startDate: z.ZodCoercedDate<unknown>;
    employmentType: z.ZodString;
    departmentId: z.ZodCoercedNumber<unknown>;
    teamId: z.ZodCoercedNumber<unknown>;
}, z.core.$strip>;
export declare const EmployeeUpdateSchema: z.ZodPipe<z.ZodObject<{
    username: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>>;
    email: z.ZodOptional<z.ZodString>;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    jobTitle: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    employmentType: z.ZodOptional<z.ZodString>;
    departmentId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    teamId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>, z.ZodTransform<{
    [k: string]: string | number | Date | undefined;
}, {
    username?: string | undefined;
    email?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    jobTitle?: string | undefined;
    startDate?: Date | undefined;
    employmentType?: string | undefined;
    departmentId?: number | undefined;
    teamId?: number | undefined;
}>>;
//# sourceMappingURL=employee.d.ts.map