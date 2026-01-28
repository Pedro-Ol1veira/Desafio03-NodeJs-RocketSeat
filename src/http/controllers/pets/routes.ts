import { FastifyInstance } from "fastify";
import { register } from "./register";
import { verifyToken } from "@/middlewares/verify-jst";
import { getAllPets } from "./getAllPets";

export async function petsRoutes(app: FastifyInstance) {
    app.post('/pets', {onRequest: [ verifyToken ]}, register);
    app.get('/pets', getAllPets);
}