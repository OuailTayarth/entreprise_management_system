/// <reference types="vitest" />
import request from "supertest";
import { app } from "../app";
import { prisma } from "../prismaClient";

let createdLeaveId: number | undefined;

afterAll(async () => {
  if (createdLeaveId) {
    await prisma.leave.deleteMany({ where: { id: createdLeaveId } });
  }
  await prisma.$disconnect();
});

/* GET /leaves */
test("GET /leaves -> 200 & array", async () => {
  const res = await request(app).get("/leaves");
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

/* POST /leaves */
test("POST /leaves -> 201 (create leave)", async () => {
  const res = await request(app).post("/leaves").send({
    employeeId: 1,
    startDate: "2025-03-10",
    endDate: "2025-03-12",
    type: "Vacation",
    reason: "Trip",
  });
  expect(res.status).toBe(201);
  expect(res.body.status).toBe("PENDING");
  createdLeaveId = res.body.id;
});

test("POST /leaves (invalid) -> 400", async () => {
  const res = await request(app).post("/leaves").send({
    employeeId: "abc", // Zod type fail
    startDate: "2025-03-10",
    endDate: "2025-03-12",
    type: "Vacation",
    reason: "Trip",
  });
  expect(res.status).toBe(400);
});

/* PATCH /leaves/:id */
test("PATCH /leaves/:id -> 200 (approve)", async () => {
  const id = createdLeaveId;
  const res = await request(app)
    .patch(`/leaves/${id}`)
    .send({ status: "approved" });
  expect(res.status).toBe(200);
  expect(res.body.status).toBe("APPROVED");
});

test("PATCH /leaves/:id (invalid body) -> 400", async () => {
  const id = createdLeaveId;
  const res = await request(app)
    .patch(`/leaves/${id}`)
    .send({ status: "unknown" }); // not in enum in validation/
  expect(res.status).toBe(400);
});

test("PATCH /leaves/:id (not found) -> 404", async () => {
  const res = await request(app)
    .patch("/leaves/999999")
    .send({ status: "rejected" });
  expect(res.status).toBe(404);
});
