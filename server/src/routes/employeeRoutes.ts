import { Router } from "express";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
  getEmployeesByDepartmentId,
  searchEmployees,
  searchEmployeesByDepartment,
} from "../controllers/employeeController";

const router = Router();

router.get("/", getEmployees); // GET /all employees
router.get("/by-department/:id", getEmployeesByDepartmentId); // GET / employees by departmentId
router.get("/departments/:id/search", searchEmployeesByDepartment); // GET /employees/departments/:departmentId/search
router.get("/search", searchEmployees); // GET /employees/search
router.get("/:id", getEmployeeById); // GET / employee by id
router.post("/", createEmployee); // POST / employees
router.patch("/:id", updateEmployeeById); // PATCH / employee by id
router.delete("/:id", deleteEmployeeById); // DELETE employee by id

export default router;
