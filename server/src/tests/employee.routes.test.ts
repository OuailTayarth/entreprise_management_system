/// <reference types="vitest" />
import request from "supertest";
import { app } from "../app";
import { prisma } from "../prismaClient";

afterAll(async () => {
  await prisma.$disconnect();
});

let createdEmployeeId: number | undefined;
const uniqueSuffix = Date.now();

/* GET /employees */
test("GET /employees -> 200 & array", async () => {
  const res = await request(app).get("/employees");
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

/* POST /employees */
test("POST /employees -> 201 (create employee)", async () => {
  const res = await request(app)
    .post("/employees")
    .send({
      username: `test.user.${uniqueSuffix}`,
      cognitoId: `c-${uniqueSuffix}`,
      email: `test${uniqueSuffix}@corp.com`,
      firstName: "Test",
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
});

// test("POST /employees (invalid) -> 400", async () => {
//   const res = await request(app)
//     .post("/employees")
//     .send({
//       // invalid email to trigger Zod
//       username: `bad.user.${uniqueSuffix}`,
//       cognitoId: `c-bad-${uniqueSuffix}`,
//       email: "not-an-email",
//       firstName: "Bad",
//       lastName: "User",
//       jobTitle: "Engineer",
//       startDate: "2025-03-01",
//       employmentType: "Full-time",
//       departmentId: 1,
//       teamId: 1,
//     });
//   expect(res.status).toBe(400);
// });

// /* GET /employees/:id */
// test("GET /employees/:id -> 200 (found)", async () => {
//   const id = createdEmployeeId!;
//   const res = await request(app).get(`/employees/${id}`);
//   expect(res.status).toBe(200);
//   expect(res.body.id).toBe(id);
// });

// test("GET /employees/:id (invalid type) -> 400", async () => {
//   const res = await request(app).get("/employees/0.5");
//   expect(res.status).toBe(400);
// });

// test("GET /employees/:id (not found) -> 404", async () => {
//   const res = await request(app).get("/employees/999999");
//   expect(res.status).toBe(404);
// });

// /* PATCH /employees/:id */
// test("PATCH /employees/:id -> 200 (updates employee)", async () => {
//   const id = createdEmployeeId!;
//   const res = await request(app)
//     .patch(`/employees/${id}`)
//     .send({ jobTitle: "Senior Engineer" });
//   expect(res.status).toBe(200);
//   expect(res.body.jobTitle).toBe("Senior Engineer");
// });

// test("PATCH /employees/:id (invalid body) -> 400", async () => {
//   const id = createdEmployeeId!;
//   const res = await request(app)
//     .patch(`/employees/${id}`)
//     .send({ departmentId: "abc" }); // fails Zod type
//   expect(res.status).toBe(400);
// });

// test("PATCH /employees/:id (not found) -> 404", async () => {
//   const res = await request(app)
//     .patch("/employees/999999")
//     .send({ jobTitle: "Ghost" });
//   expect(res.status).toBe(404);
// });

// /* DELETE /employees/:id */
// test("DELETE /employees/:id (invalid type) -> 400", async () => {
//   const res = await request(app).delete("/employees/0.5");
//   expect(res.status).toBe(400);
// });

// test("DELETE /employees/:id -> 200 (deleted)", async () => {
//   const id = createdEmployeeId!;
//   const res = await request(app).delete(`/employees/${id}`);
//   expect(res.status).toBe(200);
//   expect(res.body.message).toMatch(/deleted/i);
// });

// test("GET /employees/:id after delete -> 404", async () => {
//   const id = createdEmployeeId!;
//   const res = await request(app).get(`/employees/${id}`);
//   expect(res.status).toBe(404);
// });
