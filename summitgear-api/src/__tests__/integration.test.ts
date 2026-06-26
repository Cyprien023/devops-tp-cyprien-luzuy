import request from "supertest";
import app from "../index";

describe("GET /health", () => {
  it("should return 200 with status ok when server is running", async () => {
    // ARRANGE — serveur démarré via import app

    // ACT
    const res = await request(app).get("/health");

    // ASSERT
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body).toHaveProperty("timestamp");
    expect(res.body).toHaveProperty("uptime");
  });
});

describe("POST /api/auth/register", () => {
  it("should return 400 when required fields are missing", async () => {
    // ARRANGE
    const incompleteBody = { email: "test@test.fr" }; // pas de password

    // ACT
    const res = await request(app).post("/api/auth/register").send(incompleteBody);

    // ASSERT
    expect(res.status).toBeGreaterThanOrEqual(400);
  });
});

describe("POST /api/auth/login", () => {
  it("should return 401 when credentials are wrong", async () => {
    // ARRANGE
    const wrongCredentials = {
      email: "inconnu@summitgear.fr",
      password: "mauvaisMotDePasse",
    };

    // ACT
    const res = await request(app).post("/api/auth/login").send(wrongCredentials);

    // ASSERT
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error");
  });
});

describe("GET /api/cart", () => {
  it("should return 401 when no token is provided", async () => {
    // ARRANGE — pas de header Authorization

    // ACT
    const res = await request(app).get("/api/cart");

    // ASSERT
    expect(res.status).toBe(401);
  });
});

describe("GET /route-inconnue", () => {
  it("should return 404 when route does not exist", async () => {
    // ARRANGE
    // ACT
    const res = await request(app).get("/route-qui-nexiste-pas");

    // ASSERT
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Route introuvable");
  });
});
