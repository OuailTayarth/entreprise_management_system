"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const departmentController_1 = require("../controllers/departmentController");
const router = (0, express_1.Router)();
router.get("/", departmentController_1.getDepartments); // GET /departments
router.get("/:id", departmentController_1.getDepartmentById); // GET /departments/:id
router.post("/", departmentController_1.createDepartment); // POST /departments
router.patch("/:id", departmentController_1.updateDepartmentById); // PATCH /departments/:id
exports.default = router;
//# sourceMappingURL=departmentRoutes.js.map