import { Router } from "express";
import { SearchAll } from "src/controllers/searchController";

const router = Router();
router.get("/all", SearchAll);

export default router;
