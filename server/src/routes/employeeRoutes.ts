import { Router } from "express";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
} from "../controllers/employeeController";

const router = Router();

router.get("/", getEmployees); // GET /all employees
router.get("/:id", getEmployeeById);
router.post("/", createEmployee); // POST / employees

export default router;
