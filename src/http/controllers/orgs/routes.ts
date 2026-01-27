import { FastifyInstance } from "fastify";
import {app} from '@/app';
import { create } from "./create";

export async function orgsRoutes(app: FastifyInstance) {
    app.post('/orgs', create);
}