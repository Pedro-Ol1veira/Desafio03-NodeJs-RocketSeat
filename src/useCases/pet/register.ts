import { Pet } from "prisma/generated/client";
import { PetsRepository } from "@/repositories/petsRepository";
import { OrgsRepository } from "@/repositories/orgsRepository";

interface registerPetUseCaseRequest {
  name: string;
  breed: string;
  orgId: string;
}

interface registerPetUseCaseResponse {
  pet: Pet;
}

export class registerPetUseCase {
  constructor(private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository
  ) {}

  async execute({
    name,
    breed,
    orgId,
  }: registerPetUseCaseRequest): Promise<registerPetUseCaseResponse> {
    
    const org = await this.orgsRepository.findById(orgId);

    if(!org) {
        throw new Error("ORG Not Found");
    }

    const pet = await this.petsRepository.create({
      name,
      breed,
      orgId: orgId,
    });

    return { pet };
  }
}
