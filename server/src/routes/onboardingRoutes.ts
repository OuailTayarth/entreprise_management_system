import { Router } from "express";
import {
  getOnboardingTasks,
  createOnboardingTask,
  updateOnboardingTaskById,
} from "../controllers/onboardingController";

const router = Router();

router.get("/", getOnboardingTasks); // GET /onboarding-tasks
router.post("/", createOnboardingTask); // POST /onboarding-tasks
router.patch("/:id", updateOnboardingTaskById); // PATCH /onboarding-tasks/:id

export default router;
