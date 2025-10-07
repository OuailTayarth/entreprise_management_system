import { Request, Response } from "express";
import { prisma } from "../../src/prismaClient";
import { v4 as uuidv4 } from "uuid";
import {
  EmployeeCreateSchema,
  EmployeeUpdateSchema,
  IdParamSchema,
  zodErrorFormatter,
  removeUndefined,
  SearchQuerySchema,
} from "@shared/validation";

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

// GET /employees/by-department/:departmentId
export const getEmployeesByDepartmentId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsedDepartmentId = IdParamSchema.safeParse(req.params);

    if (!parsedDepartmentId.success) {
      res.status(400).json({
        message: "Invalid departmentId: must be a positive integer",
        errors: zodErrorFormatter(parsedDepartmentId.error),
      });
      return;
    }

    const employees = await prisma.employee.findMany({
      where: { departmentId: parsedDepartmentId.data.id },
    });

    res.json(employees);
  } catch (error: any) {
    res.status(500).json({
      message: `Error retrieving employees by department: ${error.message}`,
    });
  }
};
// GET /employees/departments/:departmentId/search
export const searchEmployeesByDepartment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsedSearch = SearchQuerySchema.safeParse(req.query);
    const parsedDept = IdParamSchema.safeParse(req.params);

    if (!parsedSearch.success) {
      res.status(400).json({
        message: "Invalid search query",
        errors: zodErrorFormatter(parsedSearch.error),
      });
      return;
    }

    if (!parsedDept.success) {
      res.status(400).json({
        message: "Invalid departmentId",
        errors: zodErrorFormatter(parsedDept.error),
      });
      return;
    }

    const { q } = parsedSearch.data;
    const searchTerm = q.toLowerCase();
    const departmentId = parsedDept.data.id;

    const employees = await prisma.employee.findMany({
      where: {
        departmentId,
        OR: [
          { firstName: { contains: searchTerm, mode: "insensitive" } },
          { lastName: { contains: searchTerm, mode: "insensitive" } },
          { email: { contains: searchTerm, mode: "insensitive" } },
          { username: { contains: searchTerm, mode: "insensitive" } },
          { jobTitle: { contains: searchTerm, mode: "insensitive" } },
        ],
      },
    });

    res.json(employees);
  } catch (e: any) {
    res.status(500).json({
      message: `Error searching department employees: ${e.message}`,
    });
  }
};

// search all Employees
export const searchEmployees = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsedSearchSchema = SearchQuerySchema.safeParse(req.query);
    if (!parsedSearchSchema.success) {
      res.status(400).json({
        message: "Invalid search query",
        errors: zodErrorFormatter(parsedSearchSchema.error),
      });
      return;
    }
    const { q } = parsedSearchSchema.data;
    const searchTerm = q.toLocaleLowerCase();
    

    // search across multiple fields
    const employees = await prisma.employee.findMany({
      where: {
        OR: [
          { firstName: { contains: searchTerm, mode: "insensitive" } },
          { lastName: { contains: searchTerm, mode: "insensitive" } },
          { email: { contains: searchTerm, mode: "insensitive" } },
          { username: { contains: searchTerm, mode: "insensitive" } },
          { jobTitle: { contains: searchTerm, mode: "insensitive" } },
        ],
      },
    });
    res.json(employees);
  } catch (e: any) {
    res
      .status(500)
      .json({ message: `Error searching employees: ${e.message}` });
  }
};

// GET /employees/:id
export const getEmployeeById = async (
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

// PATCH /employees/:id
export const updateEmployeeById = async (
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
      data: removeUndefined(result.data),
    });

    res.json(employee);
  } catch (e: any) {
    res.status(500).json({ message: `Error updating employee: ${e.message}` });
  }
};

// POST /employees/:id
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

    const employeeData = {
      ...result.data,
      cognitoId: uuidv4(),
    };

    const newEmployee = await prisma.employee.create({
      data: removeUndefined(employeeData),
    });

    res.status(201).json(newEmployee);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating employee: ${error.message}` });
  }
};

// DELETE /employees/:id
export const deleteEmployeeById = async (
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

    const found = await prisma.employee.findUnique({
      where: { id: idParsed.data.id },
    });

    if (!found) {
      res.status(404).json({ message: "Employee not found" });
    }

    await prisma.employee.delete({ where: { id: idParsed.data.id } });

    res.status(200).json({ message: "Employee deleted" });
  } catch (e: any) {
    res
      .status(500)
      .json({ message: `Error terminating employee: ${e.message}` });
  }
};
