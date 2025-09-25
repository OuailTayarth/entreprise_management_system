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
let createdTaskId;
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    if (createdTaskId) {
        yield prismaClient_1.prisma.onboardingTask.deleteMany({ where: { id: createdTaskId } });
    }
    yield prismaClient_1.prisma.$disconnect();
}));
/* GET /onboarding-tasks */
test("GET /onboarding-tasks -> 200 & array", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.app).get("/onboarding-tasks");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
}));
/* POST /onboarding-tasks */
test("POST /onboarding-tasks -> 201 (create task)", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.app).post("/onboarding-tasks").send({
        title: "Complete HR Paperwork",
        description: "Sign all required documents",
        dueDate: "2025-03-10",
        assigneeId: 1,
    });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Complete HR Paperwork");
    expect(res.body.completed).toBe(false);
    createdTaskId = res.body.id;
}));
test("POST /onboarding-tasks (invalid) -> 400", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.app).post("/onboarding-tasks").send({
        title: "", // fails Zod min(1)
        description: "Missing title",
        dueDate: "2025-03-10",
        assigneeId: "abc", // wrong type
    });
    expect(res.status).toBe(400);
}));
/* PATCH /onboarding-tasks/:id */
test("PATCH /onboarding-tasks/:id -> 200 (update task)", () => __awaiter(void 0, void 0, void 0, function* () {
    const id = createdTaskId;
    const res = yield (0, supertest_1.default)(app_1.app).patch(`/onboarding-tasks/${id}`).send({
        title: "Complete HR Paperwork (updated)",
        completed: true,
        completedAt: "2025-03-09",
    });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Complete HR Paperwork (updated)");
    expect(res.body.completed).toBe(true);
}));
test("PATCH /onboarding-tasks/:id (invalid body(empty)) -> 400", () => __awaiter(void 0, void 0, void 0, function* () {
    const id = createdTaskId;
    const res = yield (0, supertest_1.default)(app_1.app).patch(`/onboarding-tasks/${id}`).send({}); // fails "At least one field is required"
    expect(res.status).toBe(400);
}));
test("PATCH /onboarding-tasks/:id (invalid id type) -> 400", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.app)
        .patch("/onboarding-tasks/0.5")
        .send({ title: "x" });
    expect(res.status).toBe(400);
}));
test("PATCH /onboarding-tasks/:id (not found) -> 404", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.app)
        .patch("/onboarding-tasks/999999")
        .send({ title: "Nope" });
    expect(res.status).toBe(404);
}));
//# sourceMappingURL=onboarding.routes.test.js.map