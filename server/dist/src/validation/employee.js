"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeUpdateSchema = exports.EmployeeCreateSchema = void 0;
const zod_1 = require("zod");
exports.EmployeeCreateSchema = zod_1.z.object({
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
    departmentId: zod_1.z.coerce.number().int().positive(),
    teamId: zod_1.z.coerce.number().int().positive(),
});
exports.EmployeeUpdateSchema = exports.EmployeeCreateSchema.pick({
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
})
    .transform((o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)));
//# sourceMappingURL=employee.js.map