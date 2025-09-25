"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
const prismaClient_1 = require("../prismaClient");
afterAll(() => __awaiter(void 0, void 0, void 0, function* () { return yield prismaClient_1.prisma.$disconnect(); }));
let createdTeamId;
/* GET /teams */
test("GET /teams -> 200 & array", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.app).get("/teams");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
}));
/* POST /teams */
test("POST /teams -> 201(create team)", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.app)
        .post("/teams")
        .send({ name: "AI", departmentId: 1 });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe("AI");
    createdTeamId = res.body.id;
}));
test("POST /teams(invalid) -> 400", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.app)
        .post("/teams")
        .send({ name: "", departmentId: "2" });
    expect(res.status).toBe(400);
}));
/* GET /teams/:id */
test("GET /teams/:id -> 200 found", () => __awaiter(void 0, void 0, void 0, function* () {
    const id = createdTeamId;
    const res = yield (0, supertest_1.default)(app_1.app).get(`/teams/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(id);
}));
test("GET /teams/:id (invalid type) -> 400", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.app).get(`/teams/${0.5}`);
    expect(res.status).toBe(400);
}));
test("GET /teams/:id (not found) -> 404", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.app).get(`/teams/${9999}`);
    expect(res.status).toBe(404);
}));
/* PATCH /teams/:id */
test("PATCH /teams/:id (update team) -> 200", () => __awaiter(void 0, void 0, void 0, function* () {
    const id = createdTeamId;
    const res = yield (0, supertest_1.default)(app_1.app)
        .patch(`/teams/${id}`)
        .send({ name: "robotics" });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("robotics");
}));
test("PATCH /teams/:id (invalid body) -> 400", () => __awaiter(void 0, void 0, void 0, function* () {
    const id = createdTeamId;
    const res = yield (0, supertest_1.default)(app_1.app)
        .patch(`/teams/${id}`)
        .send({ departmentId: "abc" }); // fails Zod type
    expect(res.status).toBe(400);
}));
//# sourceMappingURL=team.routes.test.js.map