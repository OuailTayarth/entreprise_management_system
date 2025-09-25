import { Router } from "express";
import {
  getDocuments,
  createDocument,
  updateDocumentById,
  deleteDocumentById,
} from "../controllers/documentController";

const router = Router();

router.get("/", getDocuments); // GET /documents
router.post("/", createDocument); // POST /documents
router.patch("/:id", updateDocumentById); // PATCH /documents/:id
router.delete("/:id", deleteDocumentById); // DELETE /documents/:id

export default router;
