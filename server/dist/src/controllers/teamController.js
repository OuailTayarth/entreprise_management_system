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
exports.updateTeamById = exports.createTeam = exports.getTeamWithDetails = exports.getTeamById = exports.getTeamProductivityTrends = exports.getTeams = void 0;
const prismaClient_1 = require("../../src/prismaClient");
const validation_1 = require("../../shared/validation");
// GET /teams
const getTeams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teams = yield prismaClient_1.prisma.team.findMany();
        res.json(teams);
    }
    catch (e) {
        res.status(500).json({ message: `Error retrieving teams: ${e.message}` });
    }
});
exports.getTeams = getTeams;
// GET /teams/productivity-trends
// @NOTE: This endpoint simulates historical data for demo purposes
// In a real system, this would track actual daily productivity metrics
const getTeamProductivityTrends = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get current team productivity scores
        const teams = yield prismaClient_1.prisma.team.findMany({
            select: {
                name: true,
                productivityScore: true,
            },
        });
        // Generate 30 days of simulated data
        const chartData = [];
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 30);
        // Create data points for each day
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split("T")[0];
            // Get scores for each team by name
            const getTeamScore = (teamName) => {
                const team = teams.find((t) => t.name === teamName);
                return team ? team.productivityScore : 0;
            };
            const fullStackBase = getTeamScore("Full-Stack Development");
            const talentBase = getTeamScore("Talent Development");
            const growthBase = getTeamScore("Growth & Marketing");
            // Add small random variations to make it look realistic
            const fullStack = Math.max(70, Math.min(100, fullStackBase + (Math.random() * 10 - 5)));
            const talent = Math.max(70, Math.min(100, talentBase + (Math.random() * 10 - 5)));
            const growth = Math.max(70, Math.min(100, growthBase + (Math.random() * 10 - 5)));
            chartData.push({
                date: dateStr,
                fullStack: Math.round(fullStack),
                talent: Math.round(talent),
                growth: Math.round(growth),
            });
        }
        res.json(chartData);
    }
    catch (error) {
        res.status(500).json({
            message: `Error getting team productivity trends: ${error.message}`,
        });
    }
});
exports.getTeamProductivityTrends = getTeamProductivityTrends;
// GET /teams/:id
const getTeamById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = validation_1.IdParamSchema.safeParse(req.params);
        if (!result.success) {
            res.status(400).json({
                message: "Invalid id type",
                errors: (0, validation_1.zodErrorFormatter)(result.error),
            });
            return;
        }
        const team = yield prismaClient_1.prisma.team.findUnique({
            where: { id: result.data.id },
        });
        if (!team) {
            res.status(404).json({ message: "Team not found" });
            return;
        }
        res.json(team);
    }
    catch (e) {
        res.status(500).json({ message: `Error retrieving team: ${e.message}` });
    }
});
exports.getTeamById = getTeamById;
// GET /teams/details : return team with department and employee count
const getTeamWithDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teams = yield prismaClient_1.prisma.team.findMany({
            select: {
                id: true,
                name: true,
                collaborationScore: true,
                productivityScore: true,
                qualityScore: true,
                department: {
                    select: { name: true },
                },
                _count: {
                    select: { employees: true },
                },
            },
        });
        const teamDetails = teams.map((team) => ({
            id: team.id,
            name: team.name,
            collaborationScore: team.collaborationScore,
            productivityScore: team.productivityScore,
            qualityScore: team.qualityScore,
            departmentName: team.department.name,
            employeeCount: team._count.employees,
        }));
        res.status(200).json(teamDetails);
    }
    catch (e) {
        res.status(500).json({
            message: `Error retrieving teams with details: ${e.message}`,
        });
    }
});
exports.getTeamWithDetails = getTeamWithDetails;
// POST /teams
const createTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = validation_1.TeamCreateSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                message: "Invalid input",
                errors: (0, validation_1.zodErrorFormatter)(result.error),
            });
            return;
        }
        const team = yield prismaClient_1.prisma.team.create({ data: result.data });
        res.status(201).json(team);
    }
    catch (e) {
        res.status(500).json({ message: `Error creating team: ${e.message}` });
    }
});
exports.createTeam = createTeam;
// PATCH /teams/:id
const updateTeamById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idParsed = validation_1.IdParamSchema.safeParse(req.params);
        if (!idParsed.success) {
            res.status(400).json({
                message: "Invalid id type",
                errors: (0, validation_1.zodErrorFormatter)(idParsed.error),
            });
            return;
        }
        const result = validation_1.TeamUpdateSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                message: "Invalid input",
                errors: (0, validation_1.zodErrorFormatter)(result.error),
            });
            return;
        }
        const team = yield prismaClient_1.prisma.team.update({
            where: { id: idParsed.data.id },
            data: result.data,
        });
        res.json(team);
    }
    catch (e) {
        res.status(500).json({ message: `Error updating team: ${e.message}` });
    }
});
exports.updateTeamById = updateTeamById;
//# sourceMappingURL=teamController.js.map