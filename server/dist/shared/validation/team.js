"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamUpdateSchema = exports.TeamCreateSchema = void 0;
const zod_1 = require("zod");
exports.TeamCreateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    departmentId: zod_1.z.coerce.number().int().positive(),
});
exports.TeamUpdateSchema = exports.TeamCreateSchema.partial()
    .refine((o) => Object.keys(o).length > 0, {
    message: "At least one field is required",
})
    .transform((o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)));
//# sourceMappingURL=team.js.map