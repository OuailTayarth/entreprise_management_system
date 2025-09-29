import { z } from "zod";
export declare const DepartmentCreateSchema: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
export declare const DepartmentUpdateSchema: z.ZodPipe<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
}, z.core.$strip>, z.ZodTransform<{
    [k: string]: string | undefined;
}, {
    name?: string | undefined;
}>>;
export type createDepartmentInput = z.infer<typeof DepartmentCreateSchema>;
export type updateDepartmentInput = z.infer<typeof DepartmentUpdateSchema>;
export declare const DepartmentRespSchema: z.ZodObject<{
    name: z.ZodString;
    id: z.ZodNumber;
}, z.core.$strip>;
export type DepartmentResp = z.infer<typeof DepartmentRespSchema>;
//# sourceMappingURL=department.d.ts.map