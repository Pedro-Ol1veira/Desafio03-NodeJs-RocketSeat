import { Pet } from "prisma/generated/client";
import { PetUncheckedCreateInput } from "prisma/generated/models";
import { randomUUID } from "crypto";
import { PetsRepository } from "../petsRepository";
import { OrgsRepository } from "../orgsRepository";

export class InMemoryPetRepository implements PetsRepository {
  public items: Pet[] = [];

  constructor(private orgsRepository?: OrgsRepository) {}
  
  async create(data: PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      breed: data.breed,
      orgId: data.orgId,
      available: data.available
    };

    this.items.push(pet);

    return pet;
  }

  async findManyAvailable(address: string): Promise<Pet[]> {
    const pets: Pet[] = [];

    for(const pet of this.items) {
      if(!pet.available) continue;

      const org = await this.orgsRepository?.findById(pet.orgId);

      if(org.address === address) pets.push(pet);
    }

    return pets;
  }

  async findById(petId: string): Promise<Pet | null> {
    const pet = this.items.find(item => item.id == petId);

    if(!pet) return null;

    return pet;
  }
}
