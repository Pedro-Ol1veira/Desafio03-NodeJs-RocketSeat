import { CreateOrgUseCase } from "../org/create";
import { PrismaPetRepository } from "@/repositories/prisma/PrismaPetRepository";
import { getAPetUseCase } from "../pet/getAPet";


export function makeGetAPetUseCase() {
    const petsRepository = new PrismaPetRepository();
    const makeGetAPetUseCase = new getAPetUseCase(petsRepository);

    return makeGetAPetUseCase;
}