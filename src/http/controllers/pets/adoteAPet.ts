import { makeAdoptedPetUseCase } from '@/useCases/factories/makeAdoptedPetUseCase';
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const adoteAPet = async (request: FastifyRequest, reply: FastifyReply) => {

    const adoteAPetSchema = z.object({
        petId: z.string().nonoptional()
    });

    const { petId } = adoteAPetSchema.parse(request.params);
    try {
        const adoteAPetUseCase = makeAdoptedPetUseCase();
        const { adoptedPet } = await adoteAPetUseCase.execute({
            orgId: request.user.sub,
            petId
        });

        return reply.status(200).send({
            adoptedPet
        });
    } catch (err) {
        throw err;
    }

}
