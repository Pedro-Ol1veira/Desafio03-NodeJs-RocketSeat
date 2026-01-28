import { makeGetAPetUseCase } from '@/useCases/factories/makeGetAPetUseCase';
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const getUniquePet = async (request: FastifyRequest, reply: FastifyReply) => {

    const getUniquePetSchema = z.object({
        petId: z.string().nonoptional()
    });

    const { petId } = getUniquePetSchema.parse(request.params);
    try {
        const getUniquePetUseCase = makeGetAPetUseCase();
        const { pet } = await getUniquePetUseCase.execute({
            petId
        });

        return reply.status(200).send({
            pet
        });
    } catch (err) {
        throw err;
    }

}
