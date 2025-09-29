import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import {
  IdParamSchema,
  zodErrorFormatter,
  DocumentCreateSchema,
  DocumentUpdateSchema,
} from "@shared/validation";

// GET /documents
export const getDocuments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const docs = await prisma.document.findMany();
    res.json(docs);
  } catch (e: any) {
    res
      .status(500)
      .json({ message: `Error retrieving documents: ${e.message}` });
  }
};

// POST /documents
export const createDocument = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = DocumentCreateSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        message: "Invalid input",
        errors: zodErrorFormatter(result.error),
      });
      return;
    }
    const doc = await prisma.document.create({ data: result.data }); // DB sets signed=false by default
    res.status(201).json(doc);
  } catch (e: any) {
    res.status(500).json({ message: `Error creating document: ${e.message}` });
  }
};

// PATCH /documents/:id
export const updateDocumentById = async (
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
    const body = DocumentUpdateSchema.safeParse(req.body);
    if (!body.success) {
      res.status(400).json({
        message: "Invalid input",
        errors: zodErrorFormatter(body.error),
      });
      return;
    }

    const found = await prisma.document.findUnique({
      where: { id: result.data.id },
    });
    if (!found) {
      res.status(404).json({ message: "Document not found" });
      return;
    }

    const doc = await prisma.document.update({
      where: { id: result.data.id },
      data: body.data,
    });

    res.json(doc);
  } catch (e: any) {
    res.status(500).json({ message: `Error updating document: ${e.message}` });
  }
};

// DELETE /documents/:id
export const deleteDocumentById = async (
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

    const found = await prisma.document.findUnique({
      where: { id: idParsed.data.id },
    });
    if (!found) {
      res.status(404).json({ message: "Document not found" });
      return;
    }

    await prisma.document.delete({ where: { id: idParsed.data.id } });
    res.status(200).json({ message: "Document deleted" });
  } catch (e: any) {
    res.status(500).json({ message: `Error deleting document: ${e.message}` });
  }
};
