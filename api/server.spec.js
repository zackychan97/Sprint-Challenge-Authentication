const request = require("supertest");

const server = require("./server.js");

describe("server.js", function () {
    describe("environment", function () {
        it("should set environment to testing", function () {
            expect(process.env.DB_ENV).toBe("testing");
        });
    });

    describe("GET /", function () {
        it("should return a 200 OK", function () {
            return request(server)
                .get("/")
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });

        it("should return a JSON", function () {
            return request(server)
                .get("/")
                .then(res => {
                    expect(res.type).toMatch(/json/i);
                });
        });

        it("should return {message}", function () {
            return request(server)
                .get("/")
                .then(res => {
                    expect(res.body.message).toBe("Hello World");
                });
        });

        it.skip("auth example", function () {
            return request(server)
                .post("/api/auth/login")
                .send({ username: "me", password: "pass" })
                .then(res => {
                    const decodedToken = res.body.token;

                    return request(server)
                        .get("/api/auth/login")
                        .set("verify", decodedToken)
                        .then(res => {
                            expect(res.status).toBe(200);
                            expect(Array.isArray(res.body)).toBe(true);
                        });
                });
        });
    });
})