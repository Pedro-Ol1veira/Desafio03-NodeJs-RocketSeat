import { FastifyInstance } from "fastify";
import { register } from "./register";
import { verifyToken } from "@/middlewares/verify-jst";
import { getAllPets } from "./getAllPets";
import { getUniquePet } from "./getUniquePet";
import { adoteAPet } from "./adoteAPet";

export async function petsRoutes(app: FastifyInstance) {
    app.post('/pets', {onRequest: [ verifyToken ]}, register);
    app.get('/pets', getAllPets);
    app.get('/pets/:petId', getUniquePet);
    app.patch('/pets/:petId', {onRequest: [ verifyToken ]}, adoteAPet);
}