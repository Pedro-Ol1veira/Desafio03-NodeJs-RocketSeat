import { app } from "@/app";
import { expect, it, describe, beforeAll, afterAll } from "vitest";
import request from 'supertest';

describe("Get All Pets (e2e)", () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it("Should be able to get all pets in a city", async () => {
        await request(app.server).post("/orgs").send({
            address: "Salvador",
            name: "Minha org",
            phone: "71999999999",
            email: "teste@example.com",
            password: "123456",
        });

        const responseAtuthentication1 = await request(app.server).post('/session').send({
            email: "teste@example.com",
            password: "123456",
        });

        const token1 = responseAtuthentication1.body.token;

        await request(app.server).post('/pets').set("Authorization", `Bearer ${token1}`).send({
            name: "meu pet1",
            breed: "SRD",
            age: 3,
            size: 'SMALL',
        });

        await request(app.server).post('/pets').set("Authorization", `Bearer ${token1}`).send({
            name: "meu pet2",
            breed: "SRD",
            age: 3,
            size: 'SMALL',
        });

        await request(app.server).post("/orgs").send({
            address: "São Paulo",
            name: "Minha org",
            phone: "71999999999",
            email: "teste2@example.com",
            password: "123456",
        });

        const responseAtuthentication2 = await request(app.server).post('/session').send({
            email: "teste2@example.com",
            password: "123456",
        });

        const token2 = responseAtuthentication2.body.token;

        await request(app.server).post('/pets').set("Authorization", `Bearer ${token2}`).send({
            name: "meu pet3",
            breed: "SRD",
            age: 3,
            size: 'SMALL',
        });

        const response = await request(app.server).get('/pets').query({
            city: "Salvador"
        }).send()

        expect(response.statusCode).toEqual(200);
        expect(response.body.pets).toHaveLength(2);
        expect(response.body.pets).toEqual([
            expect.objectContaining({
                name: 'meu pet1'
            }),
            expect.objectContaining({
                name: 'meu pet2'
            }),
        ])
    });
})