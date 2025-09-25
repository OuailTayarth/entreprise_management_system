import request from "supertest";
import { app } from "../app";
import { prisma } from "../prismaClient";

let createdTaskId: number | undefined;

afterAll(async () => {
  if (createdTaskId) {
    await prisma.onboardingTask.deleteMany({ where: { id: createdTaskId } });
  }
  await prisma.$disconnect();
});

/* GET /onboarding-tasks */
test("GET /onboarding-tasks -> 200 & array", async () => {
  const res = await request(app).get("/onboarding-tasks");
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

/* POST /onboarding-tasks */
test("POST /onboarding-tasks -> 201 (create task)", async () => {
  const res = await request(app).post("/onboarding-tasks").send({
    title: "Complete HR Paperwork",
    description: "Sign all required documents",
    dueDate: "2025-03-10",
    assigneeId: 1,
  });
  expect(res.status).toBe(201);
  expect(res.body.title).toBe("Complete HR Paperwork");
  expect(res.body.completed).toBe(false);
  createdTaskId = res.body.id;
});

test("POST /onboarding-tasks (invalid) -> 400", async () => {
  const res = await request(app).post("/onboarding-tasks").send({
    title: "", // fails Zod min(1)
    description: "Missing title",
    dueDate: "2025-03-10",
    assigneeId: "abc", // wrong type
  });
  expect(res.status).toBe(400);
});

/* PATCH /onboarding-tasks/:id */
test("PATCH /onboarding-tasks/:id -> 200 (update task)", async () => {
  const id = createdTaskId!;
  const res = await request(app).patch(`/onboarding-tasks/${id}`).send({
    title: "Complete HR Paperwork (updated)",
    completed: true,
    completedAt: "2025-03-09",
  });
  expect(res.status).toBe(200);
  expect(res.body.title).toBe("Complete HR Paperwork (updated)");
  expect(res.body.completed).toBe(true);
});

test("PATCH /onboarding-tasks/:id (invalid body(empty)) -> 400", async () => {
  const id = createdTaskId!;
  const res = await request(app).patch(`/onboarding-tasks/${id}`).send({}); // fails "At least one field is required"
  expect(res.status).toBe(400);
});

test("PATCH /onboarding-tasks/:id (invalid id type) -> 400", async () => {
  const res = await request(app)
    .patch("/onboarding-tasks/0.5")
    .send({ title: "x" });
  expect(res.status).toBe(400);
});

test("PATCH /onboarding-tasks/:id (not found) -> 404", async () => {
  const res = await request(app)
    .patch("/onboarding-tasks/999999")
    .send({ title: "Nope" });
  expect(res.status).toBe(404);
});
