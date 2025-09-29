"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentUpdateSchema = exports.DocumentCreateSchema = void 0;
const zod_1 = require("zod");
exports.DocumentCreateSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    fileURL: zod_1.z.string().min(1),
    type: zod_1.z.string().min(1),
    uploadedById: zod_1.z.coerce.number().int().positive(),
    employeeId: zod_1.z.coerce.number().int().positive(),
});
exports.DocumentUpdateSchema = zod_1.z
    .object({
    title: zod_1.z.string().min(1).optional(),
    fileURL: zod_1.z.string().min(1).optional(),
    type: zod_1.z.string().min(1).optional(),
    signed: zod_1.z.boolean().optional(),
    signedAt: zod_1.z.coerce.date().nullable().optional(),
    uploadedById: zod_1.z.coerce.number().int().positive().optional(),
    employeeId: zod_1.z.coerce.number().int().positive().optional(),
})
    .refine((o) => Object.keys(o).length > 0, {
    message: "At least one field is required",
})
    .transform((o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)));
//# sourceMappingURL=document.js.map