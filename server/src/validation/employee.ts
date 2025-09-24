import { z } from "zod";

export const EmployeeCreateSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3)
    .transform((s) => s.toLowerCase()),
  cognitoId: z.string().min(1),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  jobTitle: z.string().min(1),
  startDate: z.coerce.date(),
  employmentType: z.string().min(1),
  departmentId: z.coerce.number().int().positive(),
  teamId: z.coerce.number().int().positive(),
});

export const EmployeeUpdateSchema = EmployeeCreateSchema.pick({
  username: true,
  email: true,
  firstName: true,
  lastName: true,
  jobTitle: true,
  startDate: true,
  employmentType: true,
  departmentId: true,
  teamId: true,
})
  .partial()
  .refine((obj) => Object.keys(obj).length > 0, {
    message: "At least one field is required",
  });
