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
exports.updateDepartmentById = exports.createDepartment = exports.getDepartmentById = exports.getDepartments = void 0;
const prismaClient_1 = require("../prismaClient");
const validation_1 = require("../../shared/validation");
// GET /departments
const getDepartments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departments = yield prismaClient_1.prisma.department.findMany();
        res.json(departments);
    }
    catch (e) {
        res
            .status(500)
            .json({ message: `Error retrieving departments: ${e.message}` });
    }
});
exports.getDepartments = getDepartments;
// GET /departments/:id
const getDepartmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = validation_1.IdParamSchema.safeParse(req.params);
        if (!result.success) {
            res.status(400).json({
                message: "Invalid id type",
                errors: (0, validation_1.zodErrorFormatter)(result.error),
            });
            return;
        }
        const department = yield prismaClient_1.prisma.department.findUnique({
            where: { id: result.data.id },
        });
        if (!department) {
            res.status(404).json({ message: "Department not found" });
            return;
        }
        res.json(department);
    }
    catch (e) {
        res
            .status(500)
            .json({ message: `Error retrieving department: ${e.message}` });
    }
});
exports.getDepartmentById = getDepartmentById;
// POST /departments
const createDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = validation_1.DepartmentCreateSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                message: "Invalid input",
                errors: (0, validation_1.zodErrorFormatter)(result.error),
            });
            return;
        }
        const department = yield prismaClient_1.prisma.department.create({ data: result.data });
        res.status(201).json(department);
    }
    catch (e) {
        res
            .status(500)
            .json({ message: `Error retrieving department: ${e.message}` });
    }
});
exports.createDepartment = createDepartment;
// PATCH /departments/:id
const updateDepartmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idParsed = validation_1.IdParamSchema.safeParse(req.params);
        if (!idParsed.success) {
            res.status(400).json({
                message: "Invalid id type",
                errors: (0, validation_1.zodErrorFormatter)(idParsed.error),
            });
            return;
        }
        const result = validation_1.DepartmentUpdateSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                message: "Invalid input",
                errors: (0, validation_1.zodErrorFormatter)(result.error),
            });
            return;
        }
        const department = yield prismaClient_1.prisma.department.update({
            where: { id: idParsed.data.id },
            data: result.data,
        });
        res.json(department);
    }
    catch (e) {
        res
            .status(500)
            .json({ message: `Error updating department: ${e.message}` });
    }
});
exports.updateDepartmentById = updateDepartmentById;
//# sourceMappingURL=departmentController.js.map