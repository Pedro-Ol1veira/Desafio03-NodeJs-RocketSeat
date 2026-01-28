import fastify from "fastify";
import { ZodError } from "zod";
import { orgsRoutes } from "./http/controllers/orgs/routes";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import fastifyCookie from "@fastify/cookie";

export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'token',
        signed: false,
    },
    sign: {
        expiresIn: '10m'
    }
});

app.register(fastifyCookie);

app.register(orgsRoutes);

app.setErrorHandler((error, _, reply) => {
    if(error instanceof ZodError) {
        return reply.status(400).send({message: 'Validation error', issue: error.format()});
    }

    return reply.status(500).send({message: "Internal server error."});
})