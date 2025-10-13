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
exports.deleteEmployeeById = exports.getAvgPerformanceByMonth = exports.getPerformanceTrends = exports.createEmployee = exports.updateEmployeeById = exports.getEmployeeById = exports.searchEmployees = exports.searchEmployeesByDepartment = exports.getEmployeesByDepartmentId = exports.getEmployees = void 0;
const prismaClient_1 = require("../../src/prismaClient");
const uuid_1 = require("uuid");
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
// GET /employees/departments/:departmentId/search
const searchEmployeesByDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedSearch = validation_1.SearchQuerySchema.safeParse(req.query);
        const parsedDept = validation_1.IdParamSchema.safeParse(req.params);
        if (!parsedSearch.success) {
            res.status(400).json({
                message: "Invalid search query",
                errors: (0, validation_1.zodErrorFormatter)(parsedSearch.error),
            });
            return;
        }
        if (!parsedDept.success) {
            res.status(400).json({
                message: "Invalid departmentId",
                errors: (0, validation_1.zodErrorFormatter)(parsedDept.error),
            });
            return;
        }
        const { q } = parsedSearch.data;
        const searchTerm = q.toLowerCase();
        const departmentId = parsedDept.data.id;
        const employees = yield prismaClient_1.prisma.employee.findMany({
            where: {
                departmentId,
                OR: [
                    { firstName: { contains: searchTerm, mode: "insensitive" } },
                    { lastName: { contains: searchTerm, mode: "insensitive" } },
                    { email: { contains: searchTerm, mode: "insensitive" } },
                    { username: { contains: searchTerm, mode: "insensitive" } },
                    { jobTitle: { contains: searchTerm, mode: "insensitive" } },
                ],
            },
        });
        res.json(employees);
    }
    catch (e) {
        res.status(500).json({
            message: `Error searching department employees: ${e.message}`,
        });
    }
});
exports.searchEmployeesByDepartment = searchEmployeesByDepartment;
// // GET / search all Employees
const searchEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedSearchSchema = validation_1.SearchQuerySchema.safeParse(req.query);
        if (!parsedSearchSchema.success) {
            res.status(400).json({
                message: "Invalid search query",
                errors: (0, validation_1.zodErrorFormatter)(parsedSearchSchema.error),
            });
            return;
        }
        const { q } = parsedSearchSchema.data;
        const searchTerm = q.toLocaleLowerCase();
        // search across multiple fields
        const employees = yield prismaClient_1.prisma.employee.findMany({
            where: {
                OR: [
                    { firstName: { contains: searchTerm, mode: "insensitive" } },
                    { lastName: { contains: searchTerm, mode: "insensitive" } },
                    { email: { contains: searchTerm, mode: "insensitive" } },
                    { username: { contains: searchTerm, mode: "insensitive" } },
                    { jobTitle: { contains: searchTerm, mode: "insensitive" } },
                ],
            },
        });
        res.json(employees);
    }
    catch (e) {
        res
            .status(500)
            .json({ message: `Error searching employees: ${e.message}` });
    }
});
exports.searchEmployees = searchEmployees;
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
        const employeeData = Object.assign(Object.assign({}, result.data), { cognitoId: (0, uuid_1.v4)() });
        const newEmployee = yield prismaClient_1.prisma.employee.create({
            data: (0, validation_1.removeUndefined)(employeeData),
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
// GET /employees/performance-trends // clean it
const getPerformanceTrends = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // query average performance scores by month
        const trends = yield prismaClient_1.prisma.employee.groupBy({
            by: ["startDate"],
            _avg: { performanceScore: true },
            orderBy: { startDate: "asc" },
        });
        const chartData = trends.map((item) => ({
            date: item.startDate.toISOString().split("T")[0],
            avgPerformance: item._avg.performanceScore || 0,
        }));
        res.json(chartData);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error getting performance trends : ${error.message}` });
    }
});
exports.getPerformanceTrends = getPerformanceTrends;
// GET /employees/avg-performance-by-month
const getAvgPerformanceByMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        // Get all employees with employee were hired 6 months ago
        const employees = yield prismaClient_1.prisma.employee.findMany({
            where: {
                startDate: { gte: sixMonthsAgo },
                performanceScore: { gt: 0 },
            },
            select: { performanceScore: true, startDate: true },
        });
        // Generate last 6 months (in chronological order)
        const monthNames = [
            "january",
            "february",
            "march",
            "april",
            "may",
            "june",
            "july",
            "august",
            "september",
            "october",
            "november",
            "december",
        ];
        const now = new Date();
        const months = Array.from({ length: 6 }, (_, i) => {
            const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
            return monthNames[d.getMonth()];
        });
        // Calculate average per month
        const chartData = months.map((month) => {
            // Find employees hired in this specific month
            const monthEmployees = employees.filter((emp) => {
                const d = new Date(emp.startDate);
                return monthNames[d.getMonth()] === month;
            });
            // Calculate average performance for this month for the found employees
            const avg = monthEmployees.length > 0
                ? parseFloat((monthEmployees.reduce((sum, emp) => sum + emp.performanceScore, 0) / monthEmployees.length).toFixed(2))
                : 0;
            return {
                month: month ? month.charAt(0).toUpperCase() + month.slice(1) : "",
                performance: avg,
            };
        });
        res.json(chartData);
    }
    catch (error) {
        res.status(500).json({ message: `Error: ${error.message}` });
    }
});
exports.getAvgPerformanceByMonth = getAvgPerformanceByMonth;
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