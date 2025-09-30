import { z } from "zod";
export declare const LeaveCreateSchema: z.ZodObject<{
    employeeId: z.ZodCoercedNumber<unknown>;
    startDate: z.ZodCoercedDate<unknown>;
    endDate: z.ZodCoercedDate<unknown>;
    type: z.ZodString;
    reason: z.ZodString;
}, z.core.$strip>;
export declare const LeaveStatusUpdateSchema: z.ZodObject<{
    status: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
        PENDING: "PENDING";
        APPROVED: "APPROVED";
        REJECTED: "REJECTED";
    }>>;
}, z.core.$strip>;
export type CreateLeaveInput = z.infer<typeof LeaveCreateSchema>;
export type UpdateLeaveStatusInput = z.infer<typeof LeaveStatusUpdateSchema>;
export declare const LeaveRespSchema: z.ZodObject<{
    employeeId: z.ZodCoercedNumber<unknown>;
    startDate: z.ZodCoercedDate<unknown>;
    endDate: z.ZodCoercedDate<unknown>;
    type: z.ZodString;
    reason: z.ZodString;
    id: z.ZodNumber;
    status: z.ZodEnum<{
        PENDING: "PENDING";
        APPROVED: "APPROVED";
        REJECTED: "REJECTED";
    }>;
}, z.core.$strip>;
export type LeaveResp = z.infer<typeof LeaveRespSchema>;
//# sourceMappingURL=leave.d.ts.map