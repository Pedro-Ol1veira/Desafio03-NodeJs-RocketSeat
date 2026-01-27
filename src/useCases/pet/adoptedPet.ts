import { Pet } from "prisma/generated/client";
import { PetsRepository } from "@/repositories/petsRepository";
import { OrgsRepository } from "@/repositories/orgsRepository";

interface adoptedPetUseCaseRequest {
  petId: string;
  orgId: string
}

interface adoptedPetUseCaseResponse {
  adoptedPet: Pet;
}

export class adoptedPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    petId,
    orgId
  }: adoptedPetUseCaseRequest): Promise<adoptedPetUseCaseResponse> {

    const org = await this.orgsRepository.findById(orgId);
    const pet = await this.petsRepository.findById(petId);

    if(org.id != pet.orgId) throw new Error("Unouthorized!");

    const adoptedPet = await this.petsRepository.adoptAPet(pet.id);

    return { adoptedPet };
  }
}
