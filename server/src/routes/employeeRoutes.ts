import { Router } from "express";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
} from "../controllers/employeeController";

const router = Router();

router.get("/", getEmployees); // GET /all employees
router.get("/:id", getEmployeeById); // GET / employee by id
router.post("/", createEmployee); // POST / employees
router.patch("/:id", updateEmployeeById); // PATCH / employee by id
router.delete("/:id", deleteEmployeeById); // DELETE employee by id

export default router;
