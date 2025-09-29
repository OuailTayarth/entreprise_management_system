"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentRespSchema = exports.DepartmentUpdateSchema = exports.DepartmentCreateSchema = void 0;
const zod_1 = require("zod");
exports.DepartmentCreateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
});
exports.DepartmentUpdateSchema = exports.DepartmentCreateSchema.partial()
    .refine((o) => Object.keys(o).length > 0, {
    message: "At least one field is required",
})
    .transform((o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)));
exports.DepartmentRespSchema = exports.DepartmentCreateSchema.extend({
    id: zod_1.z.number().int().positive(),
});
//# sourceMappingURL=department.js.map