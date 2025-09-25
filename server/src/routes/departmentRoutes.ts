import { Router } from "express";
import {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartmentById,
} from "../controllers/departmentController";

const router = Router();

router.get("/", getDepartments); // GET /departments
router.get("/:id", getDepartmentById); // GET /departments/:id
router.post("/", createDepartment); // POST /departments
router.patch("/:id", updateDepartmentById); // PATCH /departments/:id

export default router;
