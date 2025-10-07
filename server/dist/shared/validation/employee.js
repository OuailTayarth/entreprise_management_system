"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRespSchema = exports.EmployeeCreateSchema = exports.EmployeeUpdateSchema = void 0;
const zod_1 = require("zod");
const BaseEmployeeSchema = zod_1.z.object({
    username: zod_1.z
        .string()
        .trim()
        .min(3)
        .transform((s) => s.toLowerCase()),
    email: zod_1.z.string().email(),
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
    jobTitle: zod_1.z.string().min(1),
    salary: zod_1.z.coerce.number().positive().max(99999999.99),
    startDate: zod_1.z.coerce.date(),
    employmentType: zod_1.z.string().min(1),
    profilePictureUrl: zod_1.z.string().optional(),
    endDate: zod_1.z.coerce.date().optional(),
    departmentId: zod_1.z.coerce.number().int().positive().optional(),
    teamId: zod_1.z.coerce.number().int().positive().optional(),
});
exports.EmployeeUpdateSchema = BaseEmployeeSchema.pick({
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
})
    .partial()
    .refine((obj) => Object.keys(obj).length > 0, {
    message: "At least one field is required",
});
exports.EmployeeCreateSchema = BaseEmployeeSchema;
exports.EmployeeRespSchema = BaseEmployeeSchema.extend({
    id: zod_1.z.number().int().positive(),
    leaveBalance: zod_1.z.number(),
});
//# sourceMappingURL=employee.js.map