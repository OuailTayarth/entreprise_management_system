"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employeeController_1 = require("../controllers/employeeController");
const router = (0, express_1.Router)();
router.get("/", employeeController_1.getEmployees); // GET /all employees
router.get("/:id", employeeController_1.getEmployeeById);
router.post("/", employeeController_1.createEmployee); // POST / employees
exports.default = router;
//# sourceMappingURL=employeeRoutes.js.map