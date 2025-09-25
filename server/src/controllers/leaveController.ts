import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import {
  IdParamSchema,
  zodErrorFormatter,
  LeaveCreateSchema,
  LeaveStatusUpdateSchema,
} from "../validation";

// GET /leaves
export const getLeaves = async (req: Request, res: Response): Promise<void> => {
  try {
    const leaves = await prisma.leave.findMany();
    res.json(leaves);
  } catch (e: any) {
    res.status(500).json({ message: `Error retrieving leaves: ${e.message}` });
  }
};

// POST /leaves
export const createLeave = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = LeaveCreateSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        message: "Invalid input",
        errors: zodErrorFormatter(result.error),
      });
      return;
    }

    const leave = await prisma.leave.create({ data: result.data });
    res.status(201).json(leave);
  } catch (e: any) {
    res.status(500).json({ message: `Error creating leave: ${e.message}` });
  }
};

// PATCH /leaves/:id (status only)
export const updateLeaveStatusById = async (
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

    const bodyParsed = LeaveStatusUpdateSchema.safeParse(req.body);
    if (!bodyParsed.success) {
      res.status(400).json({
        message: "Invalid input",
        errors: zodErrorFormatter(bodyParsed.error),
      });
      return;
    }

    const found = await prisma.leave.findUnique({
      where: { id: idParsed.data.id },
    });
    if (!found) {
      res.status(404).json({ message: "Leave not found" });
    }

    const leave = await prisma.leave.update({
      where: { id: idParsed.data.id },
      data: { status: bodyParsed.data.status },
    });

    res.json(leave);
  } catch (e: any) {
    res.status(500).json({ message: `Error updating leave: ${e.message}` });
  }
};
