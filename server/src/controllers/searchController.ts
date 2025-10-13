import { SearchQuerySchema, zodErrorFormatter } from "@shared/validation";
import { Request, Response } from "express";
import { prisma } from "src/prismaClient";

export const SearchAll = async (req: Request, res: Response): Promise<void> => {
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

    const teams = await prisma.team.findMany({
      where: {
        OR: [{ name: { contains: searchTerm, mode: "insensitive" } }],
      },
    });

    res.json({ employees, teams });
  } catch (e: any) {
    res
      .status(500)
      .json({ message: `Error retrieving queried data: ${e.message}` });
  }
};
