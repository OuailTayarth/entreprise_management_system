import { z, ZodError } from "zod";
export const IdSchema = z.coerce.number().int().positive();
export const IdParamSchema = z.object({ id: IdSchema });

export const zodErrorFormatter = (err: ZodError) => {
  return (z as any).treeifyError?.(err) ?? err.issues;
};
