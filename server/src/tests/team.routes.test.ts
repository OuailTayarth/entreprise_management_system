import request from "supertest";
import { app } from "../app";
import { prisma } from "../prismaClient";

let createdTeamId: number | undefined;

afterAll(async () => {
  if (createdTeamId) {
    await prisma.team.deleteMany({ where: { id: createdTeamId } });
  }
  await prisma.$disconnect();
});

/* GET /teams */ /////
test("GET /teams -> 200 & array", async () => {
  const res = await request(app).get("/teams");
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

/* POST /teams */
test("POST /teams -> 201(create team)", async () => {
  const res = await request(app)
    .post("/teams")
    .send({ name: "AI", departmentId: 1 });
  expect(res.status).toBe(201);
  expect(res.body.name).toBe("AI");
  createdTeamId = res.body.id;
});

test("POST /teams(invalid) -> 400", async () => {
  const res = await request(app)
    .post("/teams")
    .send({ name: "", departmentId: "2" });
  expect(res.status).toBe(400);
});

/* GET /teams/:id */ ///
test("GET /teams/:id -> 200 found", async () => {
  const id = createdTeamId;
  const res = await request(app).get(`/teams/${id}`);
  expect(res.status).toBe(200);
  expect(res.body.id).toBe(id);
});

test("GET /teams/:id (invalid type) -> 400", async () => {
  const res = await request(app).get(`/teams/${0.5}`);
  expect(res.status).toBe(400);
});

test("GET /teams/:id (not found) -> 404", async () => {
  const res = await request(app).get(`/teams/${9999}`);
  expect(res.status).toBe(404);
});

/* PATCH /teams/:id */
test("PATCH /teams/:id (update team) -> 200", async () => {
  const id = createdTeamId;
  const res = await request(app)
    .patch(`/teams/${id}`)
    .send({ name: "robotics" });
  expect(res.status).toBe(200);
  expect(res.body.name).toBe("robotics");
});

test("PATCH /teams/:id (invalid body) -> 400", async () => {
  const id = createdTeamId!;
  const res = await request(app)
    .patch(`/teams/${id}`)
    .send({ departmentId: "abc" }); // fails Zod type
  expect(res.status).toBe(400);
});
