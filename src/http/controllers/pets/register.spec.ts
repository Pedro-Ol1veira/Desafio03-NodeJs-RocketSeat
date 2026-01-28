import { app } from "@/app";
import { expect, it, describe, beforeAll, afterAll } from "vitest";
import request from 'supertest';

describe("Create (e2e)", () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it("Should be able to create a ORG", async () => {
        await request(app.server).post("/orgs").send({
            address: "Salvador",
            name: "Minha org",
            phone: "71999999999",
            email: "teste@example.com",
            password: "123456",
        });

        const responseAtuthentication = await request(app.server).post('/session').send({
            email: "teste@example.com",
            password: "123456",
        });

        const token = responseAtuthentication.body.token;

        const response = await request(app.server).post('/pets').set("Authorization", `Bearer ${token}`).send({
            name: "meu pet",
            breed: "SRD",
            age: 3,
            size: 'SMALL',
        });

        expect(response.statusCode).toEqual(201);
    });
})