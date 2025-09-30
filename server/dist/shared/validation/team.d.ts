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
export type CreateTeamInput = z.infer<typeof TeamCreateSchema>;
export type UpdateTeamInput = z.infer<typeof TeamUpdateSchema>;
export declare const TeamRespSchema: z.ZodObject<{
    name: z.ZodString;
    departmentId: z.ZodCoercedNumber<unknown>;
    id: z.ZodNumber;
}, z.core.$strip>;
export type TeamResp = z.infer<typeof TeamRespSchema>;
//# sourceMappingURL=team.d.ts.map