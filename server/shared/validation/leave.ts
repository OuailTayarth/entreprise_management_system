import { z } from "zod";

const BaseLeaveSchema = z.object({
  employeeId: z.coerce.number().int().positive(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  type: z.string().min(1),
  reason: z.string().min(1),
});

export const LeaveCreateSchema = BaseLeaveSchema.refine(
  (d) => d.endDate >= d.startDate,
  {
    path: ["endDate"],
    message: "endDate must be on/after startDate",
  }
);
export const LeaveStatusUpdateSchema = z.object({
  status: z
    .string()
    .transform((s) => s.toUpperCase())
    .pipe(z.enum(["PENDING", "APPROVED", "REJECTED"])),
});

// --- inferred types ---
export type CreateLeaveInput = z.infer<typeof LeaveCreateSchema>;
export type UpdateLeaveStatusInput = z.infer<typeof LeaveStatusUpdateSchema>;

export const LeaveRespSchema = BaseLeaveSchema.extend({
  id: z.number().int().positive(),
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
});
export type LeaveResp = z.infer<typeof LeaveRespSchema>;
