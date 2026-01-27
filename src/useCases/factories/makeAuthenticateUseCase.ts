import { PrismaOrgsRepository } from "@/repositories/prisma/PrismaOrgsRepository";
import { authenticateUseCase } from "../org/authenticate";


export function makeAuthenticateUseCase() {
    const orgsRepository = new PrismaOrgsRepository();
    const makeAuthenticateUseCase = new authenticateUseCase(orgsRepository);

    return makeAuthenticateUseCase;
}