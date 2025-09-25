import { z } from "zod";

export const LeaveCreateSchema = z
  .object({
    employeeId: z.coerce.number().int().positive(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    type: z.string().min(1),
    reason: z.string().min(1),
  })
  .refine((d) => d.endDate >= d.startDate, {
    path: ["endDate"],
    message: "endDate must be on/after startDate",
  });

export const LeaveStatusUpdateSchema = z.object({
  status: z
    .string()
    .transform((s) => s.toUpperCase())
    .pipe(z.enum(["PENDING", "APPROVED", "REJECTED"])),
});
