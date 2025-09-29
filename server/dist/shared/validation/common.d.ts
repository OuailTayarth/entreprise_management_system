import { z, ZodError } from "zod";
export declare const IdSchema: z.ZodCoercedNumber<unknown>;
export declare const IdParamSchema: z.ZodObject<{
    id: z.ZodCoercedNumber<unknown>;
}, z.core.$strip>;
export declare const zodErrorFormatter: (err: ZodError) => any;
//# sourceMappingURL=common.d.ts.map