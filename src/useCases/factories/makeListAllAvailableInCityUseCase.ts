import { listAllAvailableInCityUseCase } from "../pet/listAllAvailableInCity";
import { PrismaPetRepository } from "@/repositories/prisma/PrismaPetRepository";


export function makeListAllAvailableInCityUseCase() {
    const petsRepository = new PrismaPetRepository();

    const makeListAllAvailableInCityUseCase = new listAllAvailableInCityUseCase(petsRepository);

    return makeListAllAvailableInCityUseCase;
}