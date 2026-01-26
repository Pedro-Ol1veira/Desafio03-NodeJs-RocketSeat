import { Pet } from "prisma/generated/client";
import { PetsRepository } from "@/repositories/petsRepository";
import { OrgsRepository } from "@/repositories/orgsRepository";

interface getAPetUseCaseRequest {
  petId: string;
}

interface getAPetUseCaseResponse {
  pet: Pet;
}

export class getAPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    petId,
  }: getAPetUseCaseRequest): Promise<getAPetUseCaseResponse> {

    const pet = await this.petsRepository.findById(petId);

    return { pet };
  }
}
