/// <reference types="vitest" />
import request from "supertest";
import { app } from "../app";
import { prisma } from "../prismaClient";

let createdDepartmentId: number | undefined;

afterAll(async () => {
  if (createdDepartmentId) {
    await prisma.department.deleteMany({ where: { id: createdDepartmentId } });
  }
  await prisma.$disconnect();
});

/* GET /departments */
test("GET /departments -> 200 & array", async () => {
  const res = await request(app).get("/departments");
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

/* POST /departments */
test("POST /departments -> 201 (create department)", async () => {
  const res = await request(app)
    .post("/departments")
    .send({ name: "Research" });
  expect(res.status).toBe(201);
  expect(res.body.name).toBe("Research");
  createdDepartmentId = res.body.id;
});

test("POST /departments (invalid) -> 400", async () => {
  const res = await request(app).post("/departments").send({ name: "" }); // fails Zod
  expect(res.status).toBe(400);
});

/* GET /departments/:id */
test("GET /departments/:id -> 200 (found)", async () => {
  const id = createdDepartmentId;
  const res = await request(app).get(`/departments/${id}`);
  expect(res.status).toBe(200);
  expect(res.body.id).toBe(id);
});

test("GET /departments/:id (invalid type) -> 400", async () => {
  const res = await request(app).get("/departments/0.5");
  expect(res.status).toBe(400);
});

test("GET /departments/:id (not found) -> 404", async () => {
  const res = await request(app).get("/departments/999999");
  expect(res.status).toBe(404);
});

/* PATCH /departments/:id */
test("PATCH /departments/:id -> 200 (update department)", async () => {
  const id = createdDepartmentId;
  const res = await request(app)
    .patch(`/departments/${id}`)
    .send({ name: "R&D" });
  expect(res.status).toBe(200);
  expect(res.body.name).toBe("R&D");
});

test("PATCH /departments/:id (invalid body) -> 400", async () => {
  const id = createdDepartmentId;
  const res = await request(app).patch(`/departments/${id}`).send({ name: "" }); // fails Zod
  expect(res.status).toBe(400);
});
