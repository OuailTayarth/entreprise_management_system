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
/// <reference types="vitest" />
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
const prismaClient_1 = require("../prismaClient");
let createdEmployeeId;
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    if (createdEmployeeId) {
        yield prismaClient_1.prisma.employee.deleteMany({ where: { id: createdEmployeeId } });
    }
    yield prismaClient_1.prisma.$disconnect();
}));
const uniqueSuffix = Date.now();
/* GET /employees */
test("GET /employees -> 200 & array", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.app).get("/employees");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
}));
/* POST /employees */
test("POST /employees -> 201 (create employee)", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.app)
        .post("/employees")
        .send({
        username: `test.user.${uniqueSuffix}`,
        cognitoId: `c-${uniqueSuffix}`,
        email: `test${uniqueSuffix}@corp.com`,
        firstName: "Test",
        salary: 10000,
        lastName: "User",
        jobTitle: "Engineer",
        startDate: "2025-03-01",
        employmentType: "Full-time",
        departmentId: 1,
        teamId: 1,
    });
    expect(res.status).toBe(201);
    expect(res.body.username).toBe(`test.user.${uniqueSuffix}`);
    createdEmployeeId = res.body.id;
}));
test("POST /employees (invalid) -> 400", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.app)
        .post("/employees")
        .send({
        // invalid email to trigger Zod
        username: `bad.user.${uniqueSuffix}`,
        email: "not-an-email",
        firstName: "Bad",
        lastName: "User",
        jobTitle: "Engineer",
        startDate: "2025-03-01",
        employmentType: "Full-time",
        departmentId: 1,
        teamId: 1,
    });
    expect(res.status).toBe(400);
}));
/* GET /employees/:id */
test("GET /employees/:id -> 200 (found)", () => __awaiter(void 0, void 0, void 0, function* () {
    const id = createdEmployeeId;
    const res = yield (0, supertest_1.default)(app_1.app).get(`/employees/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(id);
}));
test("GET /employees/:id (invalid type) -> 400", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.app).get(`/employees/${0.5}`);
    expect(res.status).toBe(400);
}));
test("GET /employees/:id (not found) -> 404", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.app).get("/employees/999999");
    expect(res.status).toBe(404);
}));
/* PATCH /employees/:id */
test("PATCH /employees/:id -> 200 (updates employee)", () => __awaiter(void 0, void 0, void 0, function* () {
    const id = createdEmployeeId;
    const res = yield (0, supertest_1.default)(app_1.app)
        .patch(`/employees/${id}`)
        .send({ jobTitle: "Senior Engineer" });
    expect(res.status).toBe(200);
    expect(res.body.jobTitle).toBe("Senior Engineer");
}));
test("PATCH /employees/:id (invalid body) -> 400", () => __awaiter(void 0, void 0, void 0, function* () {
    const id = createdEmployeeId;
    const res = yield (0, supertest_1.default)(app_1.app)
        .patch(`/employees/${id}`)
        .send({ departmentId: "abc" }); // fails Zod type
    expect(res.status).toBe(400);
}));
/* DELETE /employees/:id */
test("DELETE /employees/:id (invalid type) -> 400", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.app).delete("/employees/0.5");
    expect(res.status).toBe(400);
}));
test("DELETE /employees/:id -> 200 (deleted)", () => __awaiter(void 0, void 0, void 0, function* () {
    const id = createdEmployeeId;
    const res = yield (0, supertest_1.default)(app_1.app).delete(`/employees/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
}));
test("GET /employees/:id after delete -> 404", () => __awaiter(void 0, void 0, void 0, function* () {
    const id = createdEmployeeId;
    const res = yield (0, supertest_1.default)(app_1.app).get(`/employees/${id}`);
    expect(res.status).toBe(404);
}));
//# sourceMappingURL=employee.routes.test.js.map