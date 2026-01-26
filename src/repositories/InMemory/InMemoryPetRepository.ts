import { Pet } from "prisma/generated/client";
import { PetUncheckedCreateInput } from "prisma/generated/models";
import { randomUUID } from "crypto";
import { PetsRepository } from "../petsRepository";

export class InMemoryPetRepository implements PetsRepository {
  public items: Pet[] = [];

  async create(data: PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      name: data.name,
      breed: data.breed,
      orgId: data.orgId,
    };

    this.items.push(pet);

    return pet;
  }
}
