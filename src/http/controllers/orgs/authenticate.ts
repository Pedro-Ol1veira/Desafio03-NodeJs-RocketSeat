import { makeAuthenticateUseCase } from '@/useCases/factories/makeAuthenticateUseCase';
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {

    const authenticateSchema = z.object({
        email: z.email(),
        password: z.string()
    });

    const { email, password } = authenticateSchema.parse(request.body);

    try {
        const authenticateUseCase = makeAuthenticateUseCase();
        const { org } = await authenticateUseCase.execute({
            email, 
            password,
        });

        const token = await reply.jwtSign({}, {
            sign: {
                sub: org.id
            }
        });

        const refreshToken = await reply.jwtSign({}, {
            sign: {
                sub: org.id,
                expiresIn: '7d'
            }
        });

        return reply.status(200).setCookie('refreshToken', refreshToken, {
            path: '/',
            sameSite: true,
            httpOnly: true
        }).send({
            token
        });
    } catch (err) {
        throw err;
    }
}
