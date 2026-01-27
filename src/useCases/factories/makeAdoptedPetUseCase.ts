import { PrismaOrgsRepository } from "@/repositories/prisma/PrismaOrgsRepository";
import { adoptedPetUseCase } from "../pet/adoptedPet";
import { PrismaPetRepository } from "@/repositories/prisma/PrismaPetRepository";


export function makeAdoptedPetUseCase() {
    const petsRepository = new PrismaPetRepository();
    const orgsRepository = new PrismaOrgsRepository();
    const makeAdoptedPetUseCase = new adoptedPetUseCase(petsRepository, orgsRepository);

    return makeAdoptedPetUseCase;
}