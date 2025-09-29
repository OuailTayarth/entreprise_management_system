"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const documentController_1 = require("../controllers/documentController");
const router = (0, express_1.Router)();
router.get("/", documentController_1.getDocuments); // GET /documents
router.post("/", documentController_1.createDocument); // POST /documents
router.patch("/:id", documentController_1.updateDocumentById); // PATCH /documents/:id
router.delete("/:id", documentController_1.deleteDocumentById); // DELETE /documents/:id
exports.default = router;
//# sourceMappingURL=documentRoutes.js.map