import { PrismaPetRepository } from "@/repositories/prisma/PrismaPetRepository";
import { registerPetUseCase } from "../pet/register";
import { PrismaOrgsRepository } from "@/repositories/prisma/PrismaOrgsRepository";


export function makeRegisterPetUseCase() {
    const petsRepository = new PrismaPetRepository();
    const orgsRepository = new PrismaOrgsRepository();
    const makeRegisterPetUseCase = new registerPetUseCase(petsRepository, orgsRepository);

    return makeRegisterPetUseCase;
}