"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeCreateSchema = exports.EmployeeUpdateSchema = exports.BaseEmployeeSchema = void 0;
const zod_1 = require("zod");
exports.BaseEmployeeSchema = zod_1.z.object({
    username: zod_1.z
        .string()
        .trim()
        .min(3)
        .transform((s) => s.toLowerCase()),
    cognitoId: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
    jobTitle: zod_1.z.string().min(1),
    startDate: zod_1.z.coerce.date(),
    employmentType: zod_1.z.string().min(1),
    profilePictureUrl: zod_1.z.string().url().optional(),
    endDate: zod_1.z.string().datetime().optional(),
    departmentId: zod_1.z.coerce.number().int().positive().optional(),
    teamId: zod_1.z.coerce.number().int().positive().optional(),
});
exports.EmployeeUpdateSchema = exports.BaseEmployeeSchema.pick({
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
exports.EmployeeCreateSchema = exports.BaseEmployeeSchema.transform((o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)));
//# sourceMappingURL=employee.js.map