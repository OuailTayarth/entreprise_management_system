"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const onboardingController_1 = require("../controllers/onboardingController");
const router = (0, express_1.Router)();
router.get("/", onboardingController_1.getOnboardingTasks); // GET /onboarding-tasks
router.post("/", onboardingController_1.createOnboardingTask); // POST /onboarding-tasks
router.patch("/:id", onboardingController_1.updateOnboardingTaskById); // PATCH /onboarding-tasks/:id
exports.default = router;
//# sourceMappingURL=onboardingRoutes.js.map