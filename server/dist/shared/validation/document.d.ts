import { z } from "zod";
export declare const DocumentCreateSchema: z.ZodObject<{
    title: z.ZodString;
    fileURL: z.ZodString;
    type: z.ZodString;
    uploadedById: z.ZodCoercedNumber<unknown>;
    employeeId: z.ZodCoercedNumber<unknown>;
}, z.core.$strip>;
export declare const DocumentUpdateSchema: z.ZodPipe<z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    fileURL: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodString>;
    signed: z.ZodOptional<z.ZodBoolean>;
    signedAt: z.ZodOptional<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
    uploadedById: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    employeeId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>, z.ZodTransform<{
    [k: string]: string | number | boolean | Date | null | undefined;
}, {
    title?: string | undefined;
    fileURL?: string | undefined;
    type?: string | undefined;
    signed?: boolean | undefined;
    signedAt?: Date | null | undefined;
    uploadedById?: number | undefined;
    employeeId?: number | undefined;
}>>;
export type CreateDocumentInput = z.infer<typeof DocumentCreateSchema>;
export type UpdateDocumentInput = z.infer<typeof DocumentUpdateSchema>;
export declare const DocumentResSchema: z.ZodObject<{
    title: z.ZodString;
    fileURL: z.ZodString;
    type: z.ZodString;
    uploadedById: z.ZodCoercedNumber<unknown>;
    employeeId: z.ZodCoercedNumber<unknown>;
    id: z.ZodNumber;
    signed: z.ZodOptional<z.ZodBoolean>;
    signedAt: z.ZodOptional<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
}, z.core.$strip>;
export type DocumentResp = z.infer<typeof DocumentResSchema>;
//# sourceMappingURL=document.d.ts.map