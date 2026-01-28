import { makeListAllAvailableInCityUseCase } from '@/useCases/factories/makeListAllAvailableInCityUseCase';
import { makeRegisterPetUseCase } from '@/useCases/factories/makeRegisterPetUseCase';
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const getAllPets = async (request: FastifyRequest, reply: FastifyReply) => {

    const getAllPetsSchema = z.object({
        age: z.coerce.number().optional(),
        size: z.enum(['SMALL', 'MEDIUM', 'BIG']).optional(),
        city: z.string(),
    });

    const { city, age, size } = getAllPetsSchema.parse(request.query);

    try {
        const getAllPetsUseCase = makeListAllAvailableInCityUseCase();
        const { pets } = await getAllPetsUseCase.execute({
            city,
            query: {
                age,
                size
            }
        });

        return reply.status(200).send({
            pets
        });
    } catch (err) {
        throw err;
    }

}
