import { app } from "@/app";
import { expect, it, describe, beforeAll, afterAll } from "vitest";
import request from 'supertest';
import { prisma } from "@/lib/prisma";

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

        const pet = await prisma.pet.findFirstOrThrow();

        
        const response = await request(app.server).get(`/pets/${pet.id}`).send();

        expect(response.statusCode).toEqual(200);
        expect(response.body.pet).toEqual(
            expect.objectContaining({
                name: 'meu pet1'
            })
        );
    });
})