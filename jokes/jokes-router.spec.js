const server = require("../api/server.js");
const request = require("supertest");

describe("jokes router", () => {
    it("should return status 400 without auth", async () => {
        const res = await request(server).get("/api/jokes");

        expect(res.status).toBe(400);
    });

    it("should be a json response", async () => {
        const res = await request(server).get("/api/jokes");

        expect(res.type).toBe("application/json");
    });
});