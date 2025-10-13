import { z } from "zod";

export const TeamCreateSchema = z.object({
  name: z.string().min(1),
  departmentId: z.coerce.number().int().positive(),
  collaborationScore: z.coerce.number().min(0).max(100),
  productivityScore: z.coerce.number().min(0).max(100),
  qualityScore: z.coerce.number().min(0).max(100),
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

export const TeamDetailResSchema = TeamRespSchema.extend({
  departmentName: z.string(),
  employmentCount: z.number().int().positive(),
});

export type TeamDetailResp = z.infer<typeof TeamDetailResSchema>;
