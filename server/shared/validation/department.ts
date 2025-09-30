import { z } from "zod";

export const DepartmentCreateSchema = z.object({
  name: z.string().min(1),
});

export const DepartmentUpdateSchema = DepartmentCreateSchema.partial()
  .refine((o) => Object.keys(o).length > 0, {
    message: "At least one field is required",
  })
  .transform((o) =>
    Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined))
  );

// inferred types
export type CreateDepartmentInput = z.infer<typeof DepartmentCreateSchema>;
export type UpdateDepartmentInput = z.infer<typeof DepartmentUpdateSchema>;

export const DepartmentRespSchema = DepartmentCreateSchema.extend({
  id: z.number().int().positive(),
});

export type DepartmentResp = z.infer<typeof DepartmentRespSchema>;
