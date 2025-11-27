"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const searchController_1 = require("../../src/controllers/searchController");
const router = (0, express_1.Router)();
router.get("/all", searchController_1.SearchAll);
exports.default = router;
//# sourceMappingURL=searchRoutes.js.map