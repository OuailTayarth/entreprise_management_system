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
let createdDepartmentId;
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    if (createdDepartmentId) {
        yield prismaClient_1.prisma.department.deleteMany({ where: { id: createdDepartmentId } });
    }
    yield prismaClient_1.prisma.$disconnect();
}));
/* GET /departments */
test("GET /departments -> 200 & array", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.app).get("/departments");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
}));
/* POST /departments */
test("POST /departments -> 201 (create department)", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.app)
        .post("/departments")
        .send({ name: "Research" });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Research");
    createdDepartmentId = res.body.id;
}));
test("POST /departments (invalid) -> 400", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.app).post("/departments").send({ name: "" }); // fails Zod
    expect(res.status).toBe(400);
}));
/* GET /departments/:id */
test("GET /departments/:id -> 200 (found)", () => __awaiter(void 0, void 0, void 0, function* () {
    const id = createdDepartmentId;
    const res = yield (0, supertest_1.default)(app_1.app).get(`/departments/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(id);
}));
test("GET /departments/:id (invalid type) -> 400", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.app).get("/departments/0.5");
    expect(res.status).toBe(400);
}));
test("GET /departments/:id (not found) -> 404", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.app).get("/departments/999999");
    expect(res.status).toBe(404);
}));
/* PATCH /departments/:id */
test("PATCH /departments/:id -> 200 (update department)", () => __awaiter(void 0, void 0, void 0, function* () {
    const id = createdDepartmentId;
    const res = yield (0, supertest_1.default)(app_1.app)
        .patch(`/departments/${id}`)
        .send({ name: "R&D" });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("R&D");
}));
test("PATCH /departments/:id (invalid body) -> 400", () => __awaiter(void 0, void 0, void 0, function* () {
    const id = createdDepartmentId;
    const res = yield (0, supertest_1.default)(app_1.app).patch(`/departments/${id}`).send({ name: "" }); // fails Zod
    expect(res.status).toBe(400);
}));
//# sourceMappingURL=department.routes.test.js.map