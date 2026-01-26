import { Pet } from "prisma/generated/client";
import { PetsRepository } from "@/repositories/petsRepository";
import { OrgsRepository } from "@/repositories/orgsRepository";

interface listAllAvailableInCityUseCaseRequest {
  city: string;
}

interface listAllAvailableInCityUseCaseResponse {
  pets: Pet[];
}

export class listAllAvailableInCityUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    city,
  }: listAllAvailableInCityUseCaseRequest): Promise<listAllAvailableInCityUseCaseResponse> {

    const pets = await this.petsRepository.findManyAvailable(city);

    return { pets };
  }
}
