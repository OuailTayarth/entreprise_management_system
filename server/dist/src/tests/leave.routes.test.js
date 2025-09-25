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
let createdLeaveId;
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    if (createdLeaveId) {
        yield prismaClient_1.prisma.leave.deleteMany({ where: { id: createdLeaveId } });
    }
    yield prismaClient_1.prisma.$disconnect();
}));
/* GET /leaves */
test("GET /leaves -> 200 & array", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.app).get("/leaves");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
}));
/* POST /leaves */
test("POST /leaves -> 201 (create leave)", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.app).post("/leaves").send({
        employeeId: 1,
        startDate: "2025-03-10",
        endDate: "2025-03-12",
        type: "Vacation",
        reason: "Trip",
    });
    expect(res.status).toBe(201);
    expect(res.body.status).toBe("PENDING");
    createdLeaveId = res.body.id;
}));
test("POST /leaves (invalid) -> 400", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.app).post("/leaves").send({
        employeeId: "abc", // Zod type fail
        startDate: "2025-03-10",
        endDate: "2025-03-12",
        type: "Vacation",
        reason: "Trip",
    });
    expect(res.status).toBe(400);
}));
/* PATCH /leaves/:id */
test("PATCH /leaves/:id -> 200 (approve)", () => __awaiter(void 0, void 0, void 0, function* () {
    const id = createdLeaveId;
    const res = yield (0, supertest_1.default)(app_1.app)
        .patch(`/leaves/${id}`)
        .send({ status: "approved" });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("APPROVED");
}));
test("PATCH /leaves/:id (invalid body) -> 400", () => __awaiter(void 0, void 0, void 0, function* () {
    const id = createdLeaveId;
    const res = yield (0, supertest_1.default)(app_1.app)
        .patch(`/leaves/${id}`)
        .send({ status: "unknown" }); // not in enum in validation/
    expect(res.status).toBe(400);
}));
test("PATCH /leaves/:id (not found) -> 404", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.app)
        .patch("/leaves/999999")
        .send({ status: "rejected" });
    expect(res.status).toBe(404);
}));
//# sourceMappingURL=leave.routes.test.js.map