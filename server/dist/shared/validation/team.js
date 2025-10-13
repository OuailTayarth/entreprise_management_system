"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamDetailResSchema = exports.TeamRespSchema = exports.TeamUpdateSchema = exports.TeamCreateSchema = void 0;
const zod_1 = require("zod");
exports.TeamCreateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    departmentId: zod_1.z.coerce.number().int().positive(),
    collaborationScore: zod_1.z.coerce.number().min(0).max(100),
    productivityScore: zod_1.z.coerce.number().min(0).max(100),
    qualityScore: zod_1.z.coerce.number().min(0).max(100),
});
exports.TeamUpdateSchema = exports.TeamCreateSchema.partial()
    .refine((o) => Object.keys(o).length > 0, {
    message: "At least one field is required",
})
    .transform((o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)));
exports.TeamRespSchema = exports.TeamCreateSchema.extend({
    id: zod_1.z.number().int().positive(),
});
exports.TeamDetailResSchema = exports.TeamRespSchema.extend({
    departmentName: zod_1.z.string(),
    employmentCount: zod_1.z.number().int().positive(),
});
//# sourceMappingURL=team.js.map