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
exports.updateTeamById = exports.createTeam = exports.getTeamById = exports.getTeams = void 0;
const prismaClient_1 = require("../../src/prismaClient");
const validation_1 = require("../validation");
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