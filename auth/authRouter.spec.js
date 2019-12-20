const server = require("../api/server.js");
const request = require("supertest");
const db = require("../database/dbConfig.js");


describe('register works', () => {
    it('return status 201', async () => {
        const res = await request(server)
            .post("/api/auth/register")
            .send({
                username: "me",
                password: "pass"
            });
        expect(res.status).toBe(201);
    });

    it("return json", async () => {
        const res = await request(server)
            .post("/api/auth/register")
            .send({
                username: "me",
                password: "pass"
            });
        expect(res.type).toBe("application/json");
    });

    it("returns id", async () => {
        const res = await request(server)
            .post("/api/auth/register")
            .send({
                username: "me",
                password: "pass"
            });
        expect(res.body.id).not.toBeNaN();
    });

    beforeEach(async () => {
        await db("users").truncate();
    });
});

describe("login works", () => {
    it("return status 200", async () => {
        const res = await request(server)
            .post("/api/auth/login")
            .send({
                username: "me",
                password: "pass"
            });

        expect(res.status).toBe(200);
    });

    it("return token", async () => {
        const res = await request(server)
            .post("/api/auth/login")
            .send({
                username: "me",
                password: "pass"
            });

        expect(res.body.token).toBeTruthy();
    });

    it("return json", async () => {
        const res = await request(server)
            .post("/api/auth/login")
            .send({
                username: "me",
                password: "pass"
            });

        expect(res.type).toBe("application/json");
    });
});