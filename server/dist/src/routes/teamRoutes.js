"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teamController_1 = require("../controllers/teamController");
const router = (0, express_1.Router)();
router.get("/", teamController_1.getTeams); // GET /teams
router.get("/:id", teamController_1.getTeamById); // GET /teams/:id
router.post("/", teamController_1.createTeam); // POST /teams
router.patch("/:id", teamController_1.updateTeamById); // PATCH /teams/:id
exports.default = router;
//# sourceMappingURL=teamRoutes.js.map