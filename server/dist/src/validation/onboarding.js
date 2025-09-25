"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingUpdateSchema = exports.OnboardingCreateSchema = void 0;
// validation/onboarding.ts
const zod_1 = require("zod");
exports.OnboardingCreateSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    dueDate: zod_1.z.coerce.date(),
    assigneeId: zod_1.z.coerce.number().int().positive(),
});
exports.OnboardingUpdateSchema = zod_1.z
    .object({
    title: zod_1.z.string().min(1).optional(),
    description: zod_1.z.string().min(1).optional(),
    dueDate: zod_1.z.coerce.date().optional(),
    assigneeId: zod_1.z.coerce.number().int().positive().optional(),
    completed: zod_1.z.boolean().optional(),
    completedAt: zod_1.z.coerce.date().nullable().optional(),
})
    .refine((o) => Object.keys(o).length > 0, {
    message: "At least one field is required",
})
    .transform((o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)));
//# sourceMappingURL=onboarding.js.map