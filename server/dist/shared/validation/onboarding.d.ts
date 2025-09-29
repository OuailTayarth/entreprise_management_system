import { z } from "zod";
export declare const OnboardingCreateSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    dueDate: z.ZodCoercedDate<unknown>;
    assigneeId: z.ZodCoercedNumber<unknown>;
}, z.core.$strip>;
export declare const OnboardingUpdateSchema: z.ZodPipe<z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    dueDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    assigneeId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    completed: z.ZodOptional<z.ZodBoolean>;
    completedAt: z.ZodOptional<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
}, z.core.$strip>, z.ZodTransform<{
    [k: string]: string | number | boolean | Date | null | undefined;
}, {
    title?: string | undefined;
    description?: string | undefined;
    dueDate?: Date | undefined;
    assigneeId?: number | undefined;
    completed?: boolean | undefined;
    completedAt?: Date | null | undefined;
}>>;
//# sourceMappingURL=onboarding.d.ts.map