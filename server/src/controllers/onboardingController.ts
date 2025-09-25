import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import {
  IdParamSchema,
  zodErrorFormatter,
  OnboardingCreateSchema,
  OnboardingUpdateSchema,
} from "../validation";

// GET /onboarding-tasks
export const getOnboardingTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tasks = await prisma.onboardingTask.findMany();
    res.json(tasks);
  } catch (e: any) {
    res
      .status(500)
      .json({ message: `Error retrieving onboarding tasks: ${e.message}` });
  }
};

// POST /onboarding-tasks
export const createOnboardingTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = OnboardingCreateSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        message: "Invalid input",
        errors: zodErrorFormatter(result.error),
      });
      return;
    }

    const task = await prisma.onboardingTask.create({
      data: { ...result.data, completed: false, completedAt: null },
    });
    res.status(201).json(task);
  } catch (e: any) {
    res
      .status(500)
      .json({ message: `Error creating onboarding task: ${e.message}` });
  }
};

// PATCH /onboarding-tasks/:id
export const updateOnboardingTaskById = async (req: Request, res: Response) => {
  const result = IdParamSchema.safeParse(req.params);
  if (!result.success) {
    res.status(400).json({
      message: "Invalid id type",
      errors: zodErrorFormatter(result.error),
    });
    return;
  }

  const body = OnboardingUpdateSchema.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({
      message: "Invalid input",
      errors: zodErrorFormatter(body.error),
    });
    return;
  }

  const found = await prisma.onboardingTask.findUnique({
    where: { id: result.data.id },
  });
  if (!found) {
    res.status(404).json({ message: "Onboarding task not found" });
    return;
  }

  const task = await prisma.onboardingTask.update({
    where: { id: result.data.id },
    data: body.data,
  });
  res.json(task);
};
