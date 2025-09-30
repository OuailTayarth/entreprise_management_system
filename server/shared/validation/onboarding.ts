import { z } from "zod";

export const OnboardingCreateSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  dueDate: z.coerce.date(),
  assigneeId: z.coerce.number().int().positive(),
});

export const OnboardingUpdateSchema = z
  .object({
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    dueDate: z.coerce.date().optional(),
    assigneeId: z.coerce.number().int().positive().optional(),
    completed: z.boolean().optional(),
    completedAt: z.coerce.date().nullable().optional(),
  })
  .refine((o) => Object.keys(o).length > 0, {
    message: "At least one field is required",
  })
  .transform((o) =>
    Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined))
  );

// --- inferred types ---
export type CreateOnboardingInput = z.infer<typeof OnboardingCreateSchema>;
export type UpdateOnboardingInput = z.infer<typeof OnboardingUpdateSchema>;

export const OnboardingRespSchema = OnboardingCreateSchema.extend({
  id: z.number().int().positive(),
  completed: z.boolean(),
  completedAt: z.coerce.date().nullable(),
});
export type OnboardingResp = z.infer<typeof OnboardingRespSchema>;
