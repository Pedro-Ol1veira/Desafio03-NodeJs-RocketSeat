import { Pet } from "prisma/generated/client";
import { PetsRepository, Query } from "@/repositories/petsRepository";
import { OrgsRepository } from "@/repositories/orgsRepository";



interface listAllAvailableInCityUseCaseRequest {
  city: string;
  query: Query;
}

interface listAllAvailableInCityUseCaseResponse {
  pets: Pet[];
}

export class listAllAvailableInCityUseCase {
  constructor(
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    city,
    query
  }: listAllAvailableInCityUseCaseRequest): Promise<listAllAvailableInCityUseCaseResponse> {

    const pets = await this.petsRepository.findManyAvailable(city, query);

    return { pets };
  }
}
