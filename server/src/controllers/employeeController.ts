import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {
  EmployeeCreateSchema,
  EmployeeUpdateSchema,
  IdParamSchema,
  zodErrorFormatter,
} from "../validation";

const prisma = new PrismaClient();

// Get all employees list : / GET /employees
export const getEmployees = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const employees = await prisma.employee.findMany();
    res.json(employees);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving projects: ${error.message}` });
  }
};

// Get a single employee by ID : / GET /employees/:id
export const getEmployeeById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = IdParamSchema.safeParse(req.params);
    if (!result.success) {
      res.status(404).json({
        message: "Invalid id type",
        errors: zodErrorFormatter(result.error),
      });
      return;
    }

    const employee = await prisma.employee.findUnique({
      where: { id: result.data.id },
    });

    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    res.json(employee);
  } catch (e: any) {
    res
      .status(500)
      .json({ message: `Error retrieving employee: ${e.message}` });
  }
};

// Update an employee by ID : PUT /employees/:id
export const updateEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsedId = IdParamSchema.safeParse(req.params);
    if (!parsedId.success) {
      res.status(400).json({
        message: "Invalid id type",
        errors: zodErrorFormatter(parsedId.error),
      });
      return;
    }

    const result = EmployeeUpdateSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        message: "Invalid input",
        errors: zodErrorFormatter(result.error),
      });
      return;
    }

    const employee = await prisma.employee.update({
      where: { id: parsedId.data.id },
      data: result.data,
    });

    res.json(employee);
  } catch (e: any) {
    res.status(500).json({ message: `Error updating employee: ${e.message}` });
  }
};

// Create new employee: : / PUT /employees/:id
export const createEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = EmployeeCreateSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        message: "Invalid input",
        errors: zodErrorFormatter(result.error),
      });
      return;
    }

    const newEmployee = await prisma.employee.create({
      data: result.data,
    });

    res.status(201).json(newEmployee);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating employee: ${error.message}` });
  }
};
