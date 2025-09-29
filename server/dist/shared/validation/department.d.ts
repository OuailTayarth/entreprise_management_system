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
//# sourceMappingURL=department.d.ts.map