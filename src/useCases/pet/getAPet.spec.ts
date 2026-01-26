import { InMemoryOrgRepository } from "../../repositories/InMemory/InMemoryOrgRepository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetRepository } from "@/repositories/InMemory/InMemoryPetRepository";
import { getAPetUseCase } from "./getAPet";

let orgsRepository: InMemoryOrgRepository;
let petsRepository: InMemoryPetRepository;
let sut: getAPetUseCase;

describe("Get A Unique Pet Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgRepository();
    petsRepository = new InMemoryPetRepository(orgsRepository);
    sut = new getAPetUseCase(petsRepository);
  });

  it("Should get a unique pet", async () => {
    await orgsRepository.create({
      id: "org-01",
      address: "salvador",
      name: "teste",
      phone: "77777777777",
    });

    await petsRepository.create({
        id: "pet-01",
        name: "pet1",
        orgId: "org-01",
        available: true,
        age: 1,
        size: 'MEDIUM'
    });

    
    const { pet } = await sut.execute({ petId: "pet-01"});
    
    expect(pet).toEqual(expect.objectContaining({
        id: expect.any(String),
        name: 'pet1'
    }));
  });

});
