"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaveController_1 = require("../controllers/leaveController");
const router = (0, express_1.Router)();
router.get("/", leaveController_1.getLeaves); // GET /leaves
router.get("/:id", leaveController_1.getLeavesByEmployeeId);
router.post("/", leaveController_1.createLeave); // POST /leaves
router.patch("/:id", leaveController_1.updateLeaveStatusById); // PATCH /leaves/:id
exports.default = router;
//# sourceMappingURL=leaveRoutes.js.map