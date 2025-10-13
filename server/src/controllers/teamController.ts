import { Request, Response } from "express";
import { prisma } from "../../src/prismaClient";
import {
  IdParamSchema,
  zodErrorFormatter,
  TeamCreateSchema,
  TeamUpdateSchema,
} from "@shared/validation";

// GET /teams
export const getTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const teams = await prisma.team.findMany();
    res.json(teams);
  } catch (e: any) {
    res.status(500).json({ message: `Error retrieving teams: ${e.message}` });
  }
};

// GET /teams/productivity-trends
// @NOTE: This endpoint simulates historical data for demo purposes
// In a real system, this would track actual daily productivity metrics
export const getTeamProductivityTrends = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Get current team productivity scores
    const teams = await prisma.team.findMany({
      select: {
        name: true,
        productivityScore: true,
      },
    });

    // Generate 30 days of simulated data
    const chartData = [];
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);

    // Create data points for each day
    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      const dateStr = d.toISOString().split("T")[0];

      // Get scores for each team by name
      const getTeamScore = (teamName: string) => {
        const team = teams.find((t) => t.name === teamName);
        return team ? team.productivityScore : 0;
      };

      const fullStackBase = getTeamScore("Full-Stack Development");
      const talentBase = getTeamScore("Talent Development");
      const growthBase = getTeamScore("Growth & Marketing");

      // Add small random variations to make it look realistic
      const fullStack = Math.max(
        70,
        Math.min(100, fullStackBase + (Math.random() * 10 - 5))
      );
      const talent = Math.max(
        70,
        Math.min(100, talentBase + (Math.random() * 10 - 5))
      );
      const growth = Math.max(
        70,
        Math.min(100, growthBase + (Math.random() * 10 - 5))
      );

      chartData.push({
        date: dateStr,
        fullStack: Math.round(fullStack),
        talent: Math.round(talent),
        growth: Math.round(growth),
      });
    }

    res.json(chartData);
  } catch (error: any) {
    res.status(500).json({
      message: `Error getting team productivity trends: ${error.message}`,
    });
  }
};

// GET /teams/:id
export const getTeamById = async (
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

    const team = await prisma.team.findUnique({
      where: { id: result.data.id },
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

// GET /teams/details : return team with department and employee count
export const getTeamWithDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const teams = await prisma.team.findMany({
      select: {
        id: true,
        name: true,
        department: {
          select: { name: true },
        },
        _count: {
          select: { employees: true },
        },
      },
    });

    const teamDetails = teams.map((team) => ({
      id: team.id,
      name: team.name,
      departmentName: team.department.name,
      employeeCount: team._count.employees,
    }));

    res.status(200).json(teamDetails);
  } catch (e: any) {
    res.status(500).json({
      message: `Error retrieving teams with details: ${e.message}`,
    });
  }
};

// POST /teams
export const createTeam = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = TeamCreateSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        message: "Invalid input",
        errors: zodErrorFormatter(result.error),
      });
      return;
    }

    const team = await prisma.team.create({ data: result.data });
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

    const result = TeamUpdateSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        message: "Invalid input",
        errors: zodErrorFormatter(result.error),
      });
      return;
    }

    const team = await prisma.team.update({
      where: { id: idParsed.data.id },
      data: result.data,
    });

    res.json(team);
  } catch (e: any) {
    res.status(500).json({ message: `Error updating team: ${e.message}` });
  }
};
