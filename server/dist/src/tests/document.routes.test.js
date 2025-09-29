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
let createdDocumentId;
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    if (createdDocumentId) {
        yield prismaClient_1.prisma.document.deleteMany({ where: { id: createdDocumentId } });
    }
    yield prismaClient_1.prisma.$disconnect();
}));
test("GET /documents -> 200", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.app).get("/documents");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
}));
test("POST /documents -> 201 (create doc)", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.app).post("/documents").send({
        title: "Offer Letter - Test",
        fileURL: "/assets/docs/offer_test.pdf",
        type: "Offer Letter",
        uploadedById: 1,
        employeeId: 1,
    });
    expect(res.status).toBe(201);
    expect(res.body.signed).toBe(false); // DB default
    createdDocumentId = res.body.id;
}));
test("POST /documents (invalid) -> 400", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.app).post("/documents").send({
        title: "", // fails min(1)
        fileURL: "/assets/docs/x.pdf",
        type: "Offer Letter",
        uploadedById: "abc", // wrong type
        employeeId: 1,
    });
    expect(res.status).toBe(400);
}));
test("PATCH /documents/:id -> 200 (update fields, mark signed)", () => __awaiter(void 0, void 0, void 0, function* () {
    const id = createdDocumentId;
    const res = yield (0, supertest_1.default)(app_1.app).patch(`/documents/${id}`).send({
        fileURL: "/assets/docs/offer_test_v2.pdf",
        signed: true,
        signedAt: "2025-03-09",
    });
    expect(res.status).toBe(200);
    expect(res.body.fileURL).toBe("/assets/docs/offer_test_v2.pdf");
    expect(res.body.signed).toBe(true);
    expect(new Date(res.body.signedAt).toISOString().startsWith("2025-03-09")).toBe(true);
}));
test("PATCH /documents/:id (invalid body) -> 400", () => __awaiter(void 0, void 0, void 0, function* () {
    const id = createdDocumentId;
    const res = yield (0, supertest_1.default)(app_1.app).patch(`/documents/${id}`).send({}); // no fields -> refine fail
    expect(res.status).toBe(400);
}));
test("PATCH /documents/:id (invalid id type) -> 400", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.app).patch("/documents/0.5").send({ title: "X" });
    expect(res.status).toBe(400);
}));
test("PATCH /documents/:id (not found) -> 404", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.app)
        .patch("/documents/999999")
        .send({ title: "Nope" });
    expect(res.status).toBe(404);
}));
test("DELETE /documents/:id -> 200 (deleted)", () => __awaiter(void 0, void 0, void 0, function* () {
    const id = createdDocumentId;
    const res = yield (0, supertest_1.default)(app_1.app).delete(`/documents/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
    // confirm it's gone
    const check = yield (0, supertest_1.default)(app_1.app)
        .patch(`/documents/${id}`)
        .send({ title: "X" });
    expect(check.status).toBe(404);
}));
test("DELETE /documents/:id (not found) -> 404", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.app).delete("/documents/999999");
    expect(res.status).toBe(404);
}));
//# sourceMappingURL=document.routes.test.js.map