import { makeCreateOrgsUseCase } from '@/useCases/factories/makeCreateOrgsUseCase';
import { FastifyReply, FastifyRequest } from 'fastify'
import { email, z } from 'zod'

export const create = async (request: FastifyRequest, reply: FastifyReply) => {

    const createSchema = z.object({
        name: z.string(),
        address: z.string(),
        phone: z.string(),
        email: z.email(),
        password: z.string()
    });

    const { name, address, email, password, phone} = createSchema.parse(request.body);

    try {
        const createUseCase = makeCreateOrgsUseCase();
        await createUseCase.execute({
            name,
            email, 
            address,
            password,
            phone,
        });
    } catch (err) {
        throw err;
    }

    return reply.status(201).send();
    
}
