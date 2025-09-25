import { Router } from "express";
import {
  getLeaves,
  createLeave,
  updateLeaveStatusById,
} from "../controllers/leaveController";

const router = Router();

router.get("/", getLeaves); // GET /leaves
router.post("/", createLeave); // POST /leaves
router.patch("/:id", updateLeaveStatusById); // PATCH /leaves/:id

export default router;
