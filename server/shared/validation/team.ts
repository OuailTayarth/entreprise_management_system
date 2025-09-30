import { z } from "zod";

export const TeamCreateSchema = z.object({
  name: z.string().min(1),
  departmentId: z.coerce.number().int().positive(),
});

export const TeamUpdateSchema = TeamCreateSchema.partial()
  .refine((o) => Object.keys(o).length > 0, {
    message: "At least one field is required",
  })
  .transform((o) =>
    Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined))
  );

// --- inferred types ---
export type CreateTeamInput = z.infer<typeof TeamCreateSchema>;
export type UpdateTeamInput = z.infer<typeof TeamUpdateSchema>;

export const TeamRespSchema = TeamCreateSchema.extend({
  id: z.number().int().positive(),
});
export type TeamResp = z.infer<typeof TeamRespSchema>;
