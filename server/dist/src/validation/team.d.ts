import { z } from "zod";
export declare const TeamCreateSchema: z.ZodObject<{
    name: z.ZodString;
    departmentId: z.ZodCoercedNumber<unknown>;
}, z.core.$strip>;
export declare const TeamUpdateSchema: z.ZodPipe<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    departmentId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>, z.ZodTransform<{
    [k: string]: string | number | undefined;
}, {
    name?: string | undefined;
    departmentId?: number | undefined;
}>>;
//# sourceMappingURL=team.d.ts.map