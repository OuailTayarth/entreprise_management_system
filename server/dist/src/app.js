"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
// ROUTE IMPORTS
const employeeRoutes_1 = __importDefault(require("./routes/employeeRoutes"));
const teamRoutes_1 = __importDefault(require("./routes/teamRoutes"));
const departmentRoutes_1 = __importDefault(require("./routes/departmentRoutes"));
const leaveRoutes_1 = __importDefault(require("./routes/leaveRoutes"));
const onboardingRoutes_1 = __importDefault(require("./routes/onboardingRoutes"));
const documentRoutes_1 = __importDefault(require("./routes/documentRoutes"));
const searchRoutes_1 = __importDefault(require("./routes/searchRoutes"));
// CONFIGURATION
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, helmet_1.default)());
exports.app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
exports.app.use((0, morgan_1.default)("common"));
exports.app.use(body_parser_1.default.json());
exports.app.use(body_parser_1.default.urlencoded({ extended: false }));
exports.app.use((0, cors_1.default)());
// ROUTES
exports.app.get("/", (req, res) => {
    res.send("Home route!");
});
exports.app.use("/employees", employeeRoutes_1.default);
exports.app.use("/teams", teamRoutes_1.default);
exports.app.use("/departments", departmentRoutes_1.default);
exports.app.use("/leaves", leaveRoutes_1.default);
exports.app.use("/search", searchRoutes_1.default);
exports.app.use("/onboarding-tasks", onboardingRoutes_1.default);
exports.app.use("/documents", documentRoutes_1.default);
//# sourceMappingURL=app.js.map