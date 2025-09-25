import request from "supertest";
import { app } from "../app";
import { prisma } from "../prismaClient";

let createdDocumentId: number | undefined;

afterAll(async () => {
  if (createdDocumentId) {
    await prisma.document.deleteMany({ where: { id: createdDocumentId } });
  }
  await prisma.$disconnect();
});

test("GET /documents -> 200", async () => {
  const res = await request(app).get("/documents");
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

test("POST /documents -> 201 (create doc)", async () => {
  const res = await request(app).post("/documents").send({
    title: "Offer Letter - Test",
    fileURL: "/assets/docs/offer_test.pdf",
    type: "Offer Letter",
    uploadedById: 1,
    employeeId: 1,
  });
  expect(res.status).toBe(201);
  expect(res.body.signed).toBe(false); // DB default
  createdDocumentId = res.body.id;
});

test("POST /documents (invalid) -> 400", async () => {
  const res = await request(app).post("/documents").send({
    title: "", // fails min(1)
    fileURL: "/assets/docs/x.pdf",
    type: "Offer Letter",
    uploadedById: "abc", // wrong type
    employeeId: 1,
  });
  expect(res.status).toBe(400);
});

test("PATCH /documents/:id -> 200 (update fields, mark signed)", async () => {
  const id = createdDocumentId!;
  const res = await request(app).patch(`/documents/${id}`).send({
    fileURL: "/assets/docs/offer_test_v2.pdf",
    signed: true,
    signedAt: "2025-03-09",
  });
  expect(res.status).toBe(200);
  expect(res.body.fileURL).toBe("/assets/docs/offer_test_v2.pdf");
  expect(res.body.signed).toBe(true);
  expect(
    new Date(res.body.signedAt).toISOString().startsWith("2025-03-09")
  ).toBe(true);
});

test("PATCH /documents/:id (invalid body) -> 400", async () => {
  const id = createdDocumentId!;
  const res = await request(app).patch(`/documents/${id}`).send({}); // no fields -> refine fail
  expect(res.status).toBe(400);
});

test("PATCH /documents/:id (invalid id type) -> 400", async () => {
  const res = await request(app).patch("/documents/0.5").send({ title: "X" });
  expect(res.status).toBe(400);
});

test("PATCH /documents/:id (not found) -> 404", async () => {
  const res = await request(app)
    .patch("/documents/999999")
    .send({ title: "Nope" });
  expect(res.status).toBe(404);
});

test("DELETE /documents/:id -> 200 (deleted)", async () => {
  const id = createdDocumentId!;
  const res = await request(app).delete(`/documents/${id}`);
  expect(res.status).toBe(200);
  expect(res.body.message).toMatch(/deleted/i);

  // confirm it's gone
  const check = await request(app)
    .patch(`/documents/${id}`)
    .send({ title: "X" });
  expect(check.status).toBe(404);
});

test("DELETE /documents/:id (not found) -> 404", async () => {
  const res = await request(app).delete("/documents/999999");
  expect(res.status).toBe(404);
});
