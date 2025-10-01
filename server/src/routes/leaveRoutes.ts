import { Router } from "express";
import {
  getLeaves,
  createLeave,
  updateLeaveStatusById,
  getLeavesByEmployeeId,
} from "../controllers/leaveController";

const router = Router();

router.get("/", getLeaves); // GET /leaves
router.get("/:id", getLeavesByEmployeeId);
router.post("/", createLeave); // POST /leaves
router.patch("/:id", updateLeaveStatusById); // PATCH /leaves/:id

export default router;
