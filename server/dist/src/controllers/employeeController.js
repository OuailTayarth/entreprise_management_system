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
exports.deleteEmployeeById = exports.createEmployee = exports.updateEmployeeById = exports.getEmployeeById = exports.getEmployeesByDepartmentId = exports.getEmployees = void 0;
const prismaClient_1 = require("../../src/prismaClient");
const validation_1 = require("@shared/validation");
// Get all employees list : / GET /employees
const getEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield prismaClient_1.prisma.employee.findMany();
        res.json(employees);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error retrieving projects: ${error.message}` });
    }
});
exports.getEmployees = getEmployees;
// GET /employees/by-department/:departmentId
const getEmployeesByDepartmentId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedDepartmentId = validation_1.IdParamSchema.safeParse(req.params);
        if (!parsedDepartmentId.success) {
            res.status(400).json({
                message: "Invalid departmentId: must be a positive integer",
                errors: (0, validation_1.zodErrorFormatter)(parsedDepartmentId.error),
            });
            return;
        }
        const employees = yield prismaClient_1.prisma.employee.findMany({
            where: { departmentId: parsedDepartmentId.data.id },
        });
        res.json(employees);
    }
    catch (error) {
        res.status(500).json({
            message: `Error retrieving employees by department: ${error.message}`,
        });
    }
});
exports.getEmployeesByDepartmentId = getEmployeesByDepartmentId;
// GET /employees/:id
const getEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = validation_1.IdParamSchema.safeParse(req.params);
        if (!result.success) {
            res.status(400).json({
                message: "Invalid id type",
                errors: (0, validation_1.zodErrorFormatter)(result.error),
            });
            return;
        }
        const employee = yield prismaClient_1.prisma.employee.findUnique({
            where: { id: result.data.id },
        });
        if (!employee) {
            res.status(404).json({ message: "Employee not found" });
            return;
        }
        res.json(employee);
    }
    catch (e) {
        res
            .status(500)
            .json({ message: `Error retrieving employee: ${e.message}` });
    }
});
exports.getEmployeeById = getEmployeeById;
// PATCH /employees/:id
const updateEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedId = validation_1.IdParamSchema.safeParse(req.params);
        if (!parsedId.success) {
            res.status(400).json({
                message: "Invalid id type",
                errors: (0, validation_1.zodErrorFormatter)(parsedId.error),
            });
            return;
        }
        const result = validation_1.EmployeeUpdateSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                message: "Invalid input",
                errors: (0, validation_1.zodErrorFormatter)(result.error),
            });
            return;
        }
        const employee = yield prismaClient_1.prisma.employee.update({
            where: { id: parsedId.data.id },
            data: (0, validation_1.removeUndefined)(result.data),
        });
        res.json(employee);
    }
    catch (e) {
        res.status(500).json({ message: `Error updating employee: ${e.message}` });
    }
});
exports.updateEmployeeById = updateEmployeeById;
// POST /employees/:id
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = validation_1.EmployeeCreateSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                message: "Invalid input",
                errors: (0, validation_1.zodErrorFormatter)(result.error),
            });
            return;
        }
        const newEmployee = yield prismaClient_1.prisma.employee.create({
            data: (0, validation_1.removeUndefined)(result.data),
        });
        res.status(201).json(newEmployee);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error creating employee: ${error.message}` });
    }
});
exports.createEmployee = createEmployee;
// DELETE /employees/:id
const deleteEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idParsed = validation_1.IdParamSchema.safeParse(req.params);
        if (!idParsed.success) {
            res.status(400).json({
                message: "Invalid id type",
                errors: (0, validation_1.zodErrorFormatter)(idParsed.error),
            });
            return;
        }
        const found = yield prismaClient_1.prisma.employee.findUnique({
            where: { id: idParsed.data.id },
        });
        if (!found) {
            res.status(404).json({ message: "Employee not found" });
        }
        yield prismaClient_1.prisma.employee.delete({ where: { id: idParsed.data.id } });
        res.status(200).json({ message: "Employee deleted" });
    }
    catch (e) {
        res
            .status(500)
            .json({ message: `Error terminating employee: ${e.message}` });
    }
});
exports.deleteEmployeeById = deleteEmployeeById;
//# sourceMappingURL=employeeController.js.map