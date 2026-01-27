import { PrismaOrgsRepository } from "@/repositories/prisma/PrismaOrgsRepository";
import { CreateOrgUseCase } from "../org/create";


export function makeCreateOrgsUseCase() {
    const orgsRepository = new PrismaOrgsRepository();
    const makeCreateOrgsUseCase = new CreateOrgUseCase(orgsRepository);

    return makeCreateOrgsUseCase;
}