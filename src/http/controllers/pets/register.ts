import { makeCreateOrgsUseCase } from '@/useCases/factories/makeCreateOrgsUseCase';
import { makeRegisterPetUseCase } from '@/useCases/factories/makeRegisterPetUseCase';
import { FastifyReply, FastifyRequest } from 'fastify'
import { email, z } from 'zod'

export const register = async (request: FastifyRequest, reply: FastifyReply) => {

    const registerSchema = z.object({
        name: z.string(),
        breed: z.string(),
        age: z.coerce.number(),
        size: z.enum(['SMALL', 'MEDIUM', 'BIG'])
    });

    const { name, breed, age, size } = registerSchema.parse(request.body);

    try {
        const registerUseCase = makeRegisterPetUseCase();
        await registerUseCase.execute({
            age,
            breed,
            name,
            size,
            orgId: request.user.sub
        });
    } catch (err) {
        throw err;
    }

    return reply.status(201).send();
    
}
