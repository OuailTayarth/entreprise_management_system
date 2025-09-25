import { Request, Response } from "express";
import { prisma } from "../../src/prismaClient";
import {
  IdParamSchema,
  zodErrorFormatter,
  TeamCreateSchema,
  TeamUpdateSchema,
} from "../validation";

// GET /teams
export const getTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const teams = await prisma.team.findMany();
    res.json(teams);
  } catch (e: any) {
    res.status(500).json({ message: `Error retrieving teams: ${e.message}` });
  }
};

// GET /teams/:id
export const getTeamById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsed = IdParamSchema.safeParse(req.params);
    if (!parsed.success) {
      res.status(400).json({
        message: "Invalid id type",
        errors: zodErrorFormatter(parsed.error),
      });
      return;
    }

    const team = await prisma.team.findUnique({
      where: { id: parsed.data.id },
    });
    if (!team) {
      res.status(404).json({ message: "Team not found" });
      return;
    }

    res.json(team);
  } catch (e: any) {
    res.status(500).json({ message: `Error retrieving team: ${e.message}` });
  }
};

// POST /teams
export const createTeam = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsed = TeamCreateSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        message: "Invalid input",
        errors: zodErrorFormatter(parsed.error),
      });
      return;
    }

    const team = await prisma.team.create({ data: parsed.data });
    res.status(201).json(team);
  } catch (e: any) {
    res.status(500).json({ message: `Error creating team: ${e.message}` });
  }
};

// PATCH /teams/:id
export const updateTeamById = async (
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

    const bodyParsed = TeamUpdateSchema.safeParse(req.body);
    if (!bodyParsed.success) {
      res.status(400).json({
        message: "Invalid input",
        errors: zodErrorFormatter(bodyParsed.error),
      });
      return;
    }

    const team = await prisma.team.update({
      where: { id: idParsed.data.id },
      data: bodyParsed.data,
    });

    res.json(team);
  } catch (e: any) {
    res.status(500).json({ message: `Error updating team: ${e.message}` });
  }
};
