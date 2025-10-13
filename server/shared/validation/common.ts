import { z, ZodError } from "zod";
export const IdSchema = z.coerce.number().int().positive();
export const IdParamSchema = z.object({ id: IdSchema });

export const zodErrorFormatter = (err: ZodError) => {
  return (z as any).treeifyError?.(err) ?? err.issues;
};

export const SearchQuerySchema = z.object({
  q: z.string().min(1, "search term must be at least 2 characters").trim(),
});

export type SearchQueryInput = z.infer<typeof SearchQuerySchema>;

// Helper function to remove undefined values before passing them to Prisma
export const removeUndefined = <T extends Record<string, any>>(obj: T): any => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined)
  );
};



