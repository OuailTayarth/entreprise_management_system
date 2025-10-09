import { Router } from "express";
import {
  getTeams,
  getTeamById,
  createTeam,
  updateTeamById,
  getTeamWithDetails,
} from "../controllers/teamController";

const router = Router();

router.get("/", getTeams); // GET /teams
router.get("/details", getTeamWithDetails);
router.get("/:id", getTeamById); // GET /teams/:id
router.post("/", createTeam); // POST /teams
router.patch("/:id", updateTeamById); // PATCH /teams/:id

export default router;
