"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employeeController_1 = require("../controllers/employeeController");
const router = (0, express_1.Router)();
router.get("/", employeeController_1.getEmployees); // GET /all employees
router.get("/by-department/:id", employeeController_1.getEmployeesByDepartmentId); // GET / employees by departmentId
router.get("/:id", employeeController_1.getEmployeeById); // GET / employee by id
router.post("/", employeeController_1.createEmployee); // POST / employees
router.patch("/:id", employeeController_1.updateEmployeeById); // PATCH / employee by id
router.delete("/:id", employeeController_1.deleteEmployeeById); // DELETE employee by id
exports.default = router;
//# sourceMappingURL=employeeRoutes.js.map