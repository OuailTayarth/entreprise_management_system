import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import {
  IdParamSchema,
  zodErrorFormatter,
  DepartmentCreateSchema,
  DepartmentUpdateSchema,
} from "../validation";

// GET /departments
export const getDepartments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const departments = await prisma.department.findMany();
    res.json(departments);
  } catch (e: any) {
    res
      .status(500)
      .json({ message: `Error retrieving departments: ${e.message}` });
  }
};

// GET /departments/:id
export const getDepartmentById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = IdParamSchema.safeParse(req.params);
    if (!result.success) {
      res.status(400).json({
        message: "Invalid id type",
        errors: zodErrorFormatter(result.error),
      });
      return;
    }

    const department = await prisma.department.findUnique({
      where: { id: result.data.id },
    });
    if (!department) {
      res.status(404).json({ message: "Department not found" });
      return;
    }

    res.json(department);
  } catch (e: any) {
    res
      .status(500)
      .json({ message: `Error retrieving department: ${e.message}` });
  }
};

// POST /departments
export const createDepartment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = DepartmentCreateSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        message: "Invalid input",
        errors: zodErrorFormatter(result.error),
      });
      return;
    }

    const department = await prisma.department.create({ data: result.data });
    res.status(201).json(department);
  } catch (e: any) {
    res
      .status(500)
      .json({ message: `Error retrieving department: ${e.message}` });
  }
};

// PATCH /departments/:id
export const updateDepartmentById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const idParsed = IdParamSchema.safeParse(req.params);
    if (!idParsed.success) {
      res.status(400).json({
        message: "Invalid id type",
        errors: zodErrorFormatter(idParsed.error),
      });
      return;
    }

    const result = DepartmentUpdateSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        message: "Invalid input",
        errors: zodErrorFormatter(result.error),
      });
      return;
    }

    const department = await prisma.department.update({
      where: { id: idParsed.data.id },
      data: result.data,
    });

    res.json(department);
  } catch (e: any) {
    res
      .status(500)
      .json({ message: `Error updating department: ${e.message}` });
  }
};
