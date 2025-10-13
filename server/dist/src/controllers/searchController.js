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
exports.SearchAll = void 0;
const validation_1 = require("@shared/validation");
const prismaClient_1 = require("src/prismaClient");
const SearchAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const teams = yield prismaClient_1.prisma.team.findMany({
            where: {
                OR: [{ name: { contains: searchTerm, mode: "insensitive" } }],
            },
        });
        const departments = yield prismaClient_1.prisma.department.findMany({
            where: {
                OR: [{ name: { contains: searchTerm, mode: "insensitive" } }],
            },
        });
        res.json({ employees, teams, departments });
    }
    catch (e) {
        res
            .status(500)
            .json({ message: `Error retrieving queried data: ${e.message}` });
    }
});
exports.SearchAll = SearchAll;
//# sourceMappingURL=searchController.js.map