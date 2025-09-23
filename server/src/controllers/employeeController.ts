import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all employees list
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
