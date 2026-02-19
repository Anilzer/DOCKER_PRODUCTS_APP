// ✅ Ne charge .env que si MONGO_URI n'est pas déjà fourni (CI)
if (!process.env.MONGO_URI) {
  require("dotenv").config();
}

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../src/app");

describe("Integration: API <-> MongoDB (products)", () => {
  jest.setTimeout(30000);

  beforeAll(async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI is required for integration tests");

    // ✅ force IPv4 et évite localhost/::1
    const safeUri = uri.replace("localhost", "127.0.0.1");

    await mongoose.connect(safeUri, {
      serverSelectionTimeoutMS: 20000,
    });
  });
  

  afterAll(async () => {
    try {
      if (mongoose.connection.readyState === 1 && mongoose.connection.db) {
        await mongoose.connection.db.dropDatabase();
      }
    } finally {
      await mongoose.disconnect();
    }
  });

  test("POST then GET /api/products", async () => {
    const payload = { name: "Orange", price: 23.29, description: "Test CI" };

    const created = await request(app)
      .post("/api/products")
      .send(payload)
      .expect(201);

    expect(created.body).toHaveProperty("_id");
    expect(created.body.name).toBe("Orange");

    const list = await request(app).get("/api/products").expect(200);

    expect(Array.isArray(list.body)).toBe(true);
    expect(list.body.length).toBeGreaterThanOrEqual(1);
  });
});
