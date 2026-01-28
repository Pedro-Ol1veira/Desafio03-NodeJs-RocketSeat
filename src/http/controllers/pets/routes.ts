import { FastifyInstance } from "fastify";
import { register } from "./register";
import { verifyToken } from "@/middlewares/verify-jst";

export async function petsRoutes(app: FastifyInstance) {
    app.post('/pets', {onRequest: [ verifyToken ]}, register);
}