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
exports.updateLeaveStatusById = exports.createLeave = exports.getLeavesByEmployeeId = exports.getLeaves = void 0;
const prismaClient_1 = require("../prismaClient");
const validation_1 = require("../../shared/validation");
// GET /leaves
const getLeaves = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const leaves = yield prismaClient_1.prisma.leave.findMany();
        res.json(leaves);
    }
    catch (e) {
        res.status(500).json({ message: `Error retrieving leaves: ${e.message}` });
    }
});
exports.getLeaves = getLeaves;
// GET /employees/:employeeId
const getLeavesByEmployeeId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedEmployeeId = validation_1.IdParamSchema.safeParse(req.params);
        if (!parsedEmployeeId.success) {
            res.status(400).json({
                message: "Invalid employeeId: must be a positive integer",
                errors: (0, validation_1.zodErrorFormatter)(parsedEmployeeId.error),
            });
            return;
        }
        const employees = yield prismaClient_1.prisma.leave.findMany({
            where: { employeeId: parsedEmployeeId.data.id },
        });
        res.json(employees);
    }
    catch (error) {
        res.status(500).json({
            message: `Error retrieving Leaves by EmployeeId: ${error.message}`,
        });
    }
});
exports.getLeavesByEmployeeId = getLeavesByEmployeeId;
// POST /leaves
const createLeave = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = validation_1.LeaveCreateSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                message: "Invalid input",
                errors: (0, validation_1.zodErrorFormatter)(result.error),
            });
            return;
        }
        const leave = yield prismaClient_1.prisma.leave.create({ data: result.data });
        res.status(201).json(leave);
    }
    catch (e) {
        res.status(500).json({ message: `Error creating leave: ${e.message}` });
    }
});
exports.createLeave = createLeave;
// PATCH /leaves/:id (status only)
const updateLeaveStatusById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idParsed = validation_1.IdParamSchema.safeParse(req.params);
        if (!idParsed.success) {
            res.status(400).json({
                message: "Invalid id type",
                errors: (0, validation_1.zodErrorFormatter)(idParsed.error),
            });
            return;
        }
        const bodyParsed = validation_1.LeaveStatusUpdateSchema.safeParse(req.body);
        if (!bodyParsed.success) {
            res.status(400).json({
                message: "Invalid input",
                errors: (0, validation_1.zodErrorFormatter)(bodyParsed.error),
            });
            return;
        }
        const found = yield prismaClient_1.prisma.leave.findUnique({
            where: { id: idParsed.data.id },
        });
        if (!found) {
            res.status(404).json({ message: "Leave not found" });
        }
        const leave = yield prismaClient_1.prisma.leave.update({
            where: { id: idParsed.data.id },
            data: { status: bodyParsed.data.status },
        });
        res.json(leave);
    }
    catch (e) {
        res.status(500).json({ message: `Error updating leave: ${e.message}` });
    }
});
exports.updateLeaveStatusById = updateLeaveStatusById;
//# sourceMappingURL=leaveController.js.map