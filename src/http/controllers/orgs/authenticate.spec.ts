import { app } from "@/app";
import { expect, it, describe, beforeAll, afterAll } from "vitest";
import request from 'supertest';

describe("Authenticate (e2e)", () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it("Should be able to authenticate a ORG", async () => {
        await request(app.server).post("/orgs").send({
            address: "Salvador",
            name: "Minha org",
            phone: "71999999999",
            email: "teste@example.com",
            password: "123456",
        });

        const response = await request(app.server).post('/session').send({
            email: "teste@example.com",
            password: "123456",
        })

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            token: expect.any(String),
        });
    });
})