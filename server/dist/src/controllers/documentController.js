"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDocumentById = exports.updateDocumentById = exports.createDocument = exports.getDocuments = void 0;
const prismaClient_1 = require("../prismaClient");
const validation_1 = require("@shared/validation");
// GET /documents
const getDocuments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docs = yield prismaClient_1.prisma.document.findMany();
        res.json(docs);
    }
    catch (e) {
        res
            .status(500)
            .json({ message: `Error retrieving documents: ${e.message}` });
    }
});
exports.getDocuments = getDocuments;
// POST /documents
const createDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = validation_1.DocumentCreateSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                message: "Invalid input",
                errors: (0, validation_1.zodErrorFormatter)(result.error),
            });
            return;
        }
        const doc = yield prismaClient_1.prisma.document.create({ data: result.data }); // DB sets signed=false by default
        res.status(201).json(doc);
    }
    catch (e) {
        res.status(500).json({ message: `Error creating document: ${e.message}` });
    }
});
exports.createDocument = createDocument;
// PATCH /documents/:id
const updateDocumentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = validation_1.IdParamSchema.safeParse(req.params);
        if (!result.success) {
            res.status(400).json({
                message: "Invalid id type",
                errors: (0, validation_1.zodErrorFormatter)(result.error),
            });
            return;
        }
        const body = validation_1.DocumentUpdateSchema.safeParse(req.body);
        if (!body.success) {
            res.status(400).json({
                message: "Invalid input",
                errors: (0, validation_1.zodErrorFormatter)(body.error),
            });
            return;
        }
        const found = yield prismaClient_1.prisma.document.findUnique({
            where: { id: result.data.id },
        });
        if (!found) {
            res.status(404).json({ message: "Document not found" });
            return;
        }
        const doc = yield prismaClient_1.prisma.document.update({
            where: { id: result.data.id },
            data: body.data,
        });
        res.json(doc);
    }
    catch (e) {
        res.status(500).json({ message: `Error updating document: ${e.message}` });
    }
});
exports.updateDocumentById = updateDocumentById;
// DELETE /documents/:id
const deleteDocumentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idParsed = validation_1.IdParamSchema.safeParse(req.params);
        if (!idParsed.success) {
            res.status(400).json({
                message: "Invalid id type",
                errors: (0, validation_1.zodErrorFormatter)(idParsed.error),
            });
            return;
        }
        const found = yield prismaClient_1.prisma.document.findUnique({
            where: { id: idParsed.data.id },
        });
        if (!found) {
            res.status(404).json({ message: "Document not found" });
            return;
        }
        yield prismaClient_1.prisma.document.delete({ where: { id: idParsed.data.id } });
        res.status(200).json({ message: "Document deleted" });
    }
    catch (e) {
        res.status(500).json({ message: `Error deleting document: ${e.message}` });
    }
});
exports.deleteDocumentById = deleteDocumentById;
//# sourceMappingURL=documentController.js.map