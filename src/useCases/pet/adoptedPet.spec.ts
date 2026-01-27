import { InMemoryOrgRepository } from "../../repositories/InMemory/InMemoryOrgRepository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetRepository } from "@/repositories/InMemory/InMemoryPetRepository";
import { adoptedPetUseCase } from "./adoptedPet";

let orgsRepository: InMemoryOrgRepository;
let petsRepository: InMemoryPetRepository;
let sut: adoptedPetUseCase;

describe("Adopte Pet Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgRepository();
    petsRepository = new InMemoryPetRepository(orgsRepository);
    sut = new adoptedPetUseCase(petsRepository, orgsRepository);
  });

  it("Should get a unique pet", async () => {
    await orgsRepository.create({
      id: "org-01",
      address: "salvador",
      email: "teste@example",
      name: "teste",
      phone: "77777777777",
      password: '123456'
    });

    await petsRepository.create({
        id: "pet-01",
        name: "pet1",
        orgId: "org-01",
        available: true,
        age: 1,
        size: 'MEDIUM'
    });

    
    const { adoptedPet } = await sut.execute({petId: 'pet-01', orgId: 'org-01'});
    
    expect(adoptedPet).toEqual(expect.objectContaining({
        id: expect.any(String),
        name: 'pet1',
        available: false
    }));
  });

});
