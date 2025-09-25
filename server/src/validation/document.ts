import { z } from "zod";

export const DocumentCreateSchema = z.object({
  title: z.string().min(1),
  fileURL: z.string().min(1),
  type: z.string().min(1),
  uploadedById: z.coerce.number().int().positive(),
  employeeId: z.coerce.number().int().positive(),
});

export const DocumentUpdateSchema = z
  .object({
    title: z.string().min(1).optional(),
    fileURL: z.string().min(1).optional(),
    type: z.string().min(1).optional(),
    signed: z.boolean().optional(),
    signedAt: z.coerce.date().nullable().optional(),
    uploadedById: z.coerce.number().int().positive().optional(),
    employeeId: z.coerce.number().int().positive().optional(),
  })
  .refine((o) => Object.keys(o).length > 0, {
    message: "At least one field is required",
  })
  .transform((o) =>
    Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined))
  );
