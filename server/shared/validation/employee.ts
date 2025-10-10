import { z } from "zod";

const BaseEmployeeSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3)
    .transform((s) => s.toLowerCase()),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  jobTitle: z.string().min(1),
  salary: z.coerce.number().positive().max(99999999.99),
  startDate: z.coerce.date(),
  employmentType: z.string().min(1),
  performanceScore: z.coerce.number().min(0).max(100).optional(),

  profilePictureUrl: z.string().optional(),
  endDate: z.coerce.date().optional(),
  departmentId: z.coerce.number().int().positive().optional(),
  teamId: z.coerce.number().int().positive().optional(),
});

export const EmployeeUpdateSchema = BaseEmployeeSchema.pick({
  username: true,
  email: true,
  salary: true,
  firstName: true,
  lastName: true,
  jobTitle: true,
  startDate: true,
  employmentType: true,
  departmentId: true,
  teamId: true,
  profilePictureUrl: true,
  performanceScore: true,
})
  .partial()
  .refine((obj) => Object.keys(obj).length > 0, {
    message: "At least one field is required",
  });

export const EmployeeCreateSchema = BaseEmployeeSchema;

// --- inferred types ---
export type CreateEmployeeInput = z.infer<typeof EmployeeCreateSchema>;
export type UpdateEmployeeInput = z.infer<typeof EmployeeUpdateSchema>;

export const EmployeeRespSchema = BaseEmployeeSchema.extend({
  id: z.number().int().positive(),
  leaveBalance: z.number(),
});
export type EmployeeResp = z.infer<typeof EmployeeRespSchema>;

// -- Performance trends
export const PerformanceTrendBaseSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD format
  avgPerformance: z.number().min(0).max(100),
});

export const PerformanceTrendsResponseSchema = z.array(
  PerformanceTrendBaseSchema
);

export type PerformanceTrendsRes = z.infer<
  typeof PerformanceTrendsResponseSchema
>;
