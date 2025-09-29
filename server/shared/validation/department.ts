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
