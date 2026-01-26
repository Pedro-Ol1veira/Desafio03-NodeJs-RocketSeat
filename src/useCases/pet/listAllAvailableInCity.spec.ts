import { InMemoryOrgRepository } from "../../repositories/InMemory/InMemoryOrgRepository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetRepository } from "@/repositories/InMemory/InMemoryPetRepository";
import { listAllAvailableInCityUseCase } from "./listAllAvailableInCity";
import { Org } from "prisma/generated/client";

let orgsRepository: InMemoryOrgRepository;
let petsRepository: InMemoryPetRepository;
let sut: listAllAvailableInCityUseCase;

describe("List All Pets In The City Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgRepository();
    petsRepository = new InMemoryPetRepository(orgsRepository);
    sut = new listAllAvailableInCityUseCase(petsRepository, orgsRepository);
  });

  it("Should get all available pets in the city", async () => {
    await orgsRepository.create({
      id: "org-01",
      address: "salvador",
      name: "teste",
      phone: "77777777777",
    });

    await orgsRepository.create({
      id: "org-02",
      address: "sao paulo",
      name: "teste",
      phone: "77777777777",
    });

    await petsRepository.create({
        name: "pet1",
        orgId: "org-02",
        available: true,
        age: 1,
        port: 'MEDIUM'
    });

    await petsRepository.create({
        name: "pet2",
        orgId: "org-02",
        available: true,
        age: 2,
        port: 'BIG'
    });

    await petsRepository.create({
        name: "pet3",
        orgId: "org-01",
        available: true,
        age: 4,
        port: 'MEDIUM'
    });

    await petsRepository.create({
        name: "pet3",
        orgId: "org-01",
        available: false,
        age: 2,
        port: 'MEDIUM'
    });

    const { pets } = await sut.execute({ city: "salvador"});
    
    expect(pets).toHaveLength(1);
    expect(pets).toEqual([
        expect.objectContaining({
            name: 'pet3'
        })
    ]);

  });

});
