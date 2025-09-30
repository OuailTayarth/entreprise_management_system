"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveRespSchema = exports.LeaveStatusUpdateSchema = exports.LeaveCreateSchema = void 0;
const zod_1 = require("zod");
const BaseLeaveSchema = zod_1.z.object({
    employeeId: zod_1.z.coerce.number().int().positive(),
    startDate: zod_1.z.coerce.date(),
    endDate: zod_1.z.coerce.date(),
    type: zod_1.z.string().min(1),
    reason: zod_1.z.string().min(1),
});
exports.LeaveCreateSchema = BaseLeaveSchema.refine((d) => d.endDate >= d.startDate, {
    path: ["endDate"],
    message: "endDate must be on/after startDate",
});
exports.LeaveStatusUpdateSchema = zod_1.z.object({
    status: zod_1.z
        .string()
        .transform((s) => s.toUpperCase())
        .pipe(zod_1.z.enum(["PENDING", "APPROVED", "REJECTED"])),
});
exports.LeaveRespSchema = BaseLeaveSchema.extend({
    id: zod_1.z.number().int().positive(),
    status: zod_1.z.enum(["PENDING", "APPROVED", "REJECTED"]),
});
//# sourceMappingURL=leave.js.map