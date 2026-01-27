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
      email: "teste@example.com",
      password: '123456'
    });

    await orgsRepository.create({
      id: "org-02",
      address: "sao paulo",
      name: "teste",
      phone: "77777777777",
      email: "teste1@example.com",
      password: '123456'
    });

    await petsRepository.create({
      name: "pet1",
      orgId: "org-02",
      available: true,
      age: 1,
      size: "MEDIUM",
    });

    await petsRepository.create({
      name: "pet2",
      orgId: "org-02",
      available: true,
      age: 2,
      size: "BIG",
    });

    await petsRepository.create({
      name: "pet3",
      orgId: "org-01",
      available: true,
      age: 4,
      size: "MEDIUM",
    });

    await petsRepository.create({
      name: "pet3",
      orgId: "org-01",
      available: false,
      age: 2,
      size: "MEDIUM",
    });

    const { pets } = await sut.execute({ city: "salvador", query: {} });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual([
      expect.objectContaining({
        name: "pet3",
      }),
    ]);
  });

  it("Should get all available pets in the city with age filter", async () => {
    await orgsRepository.create({
      id: "org-01",
      address: "salvador",
      name: "teste",
      phone: "77777777777",
      email: "teste@example.com",
      password: '123456'
    });

    await petsRepository.create({
      name: "pet1",
      orgId: "org-01",
      available: true,
      age: 1,
      size: "MEDIUM",
    });

    await petsRepository.create({
      name: "pet2",
      orgId: "org-01",
      available: true,
      age: 2,
      size: "BIG",
    });

    await petsRepository.create({
      name: "pet3",
      orgId: "org-01",
      available: true,
      age: 4,
      size: "MEDIUM",
    });

    await petsRepository.create({
      name: "pet4",
      orgId: "org-01",
      available: true,
      age: 2,
      size: "MEDIUM",
    });

    const { pets } = await sut.execute({
      city: "salvador",
      query: {
        age: 2,
      },
    });

    expect(pets).toHaveLength(2);
    expect(pets).toEqual([
      expect.objectContaining({
        name: "pet2",
      }),
      expect.objectContaining({
        name: "pet4",
      }),
    ]);
  });

  it("Should get all available pets in the city with size filter", async () => {
    await orgsRepository.create({
      id: "org-01",
      address: "salvador",
      name: "teste",
      phone: "77777777777",
      email: "teste@example.com",
      password: '123456'
    });

    await petsRepository.create({
      name: "pet1",
      orgId: "org-01",
      available: true,
      age: 1,
      size: "MEDIUM",
    });

    await petsRepository.create({
      name: "pet2",
      orgId: "org-01",
      available: true,
      age: 2,
      size: "BIG",
    });

    await petsRepository.create({
      name: "pet4",
      orgId: "org-01",
      available: true,
      age: 2,
      size: "MEDIUM",
    });

    const { pets } = await sut.execute({
      city: "salvador",
      query: {
        size: "MEDIUM",
      },
    });

    expect(pets).toHaveLength(2);
    expect(pets).toEqual([
      expect.objectContaining({
        name: "pet1",
      }),
      expect.objectContaining({
        name: "pet4",
      }),
    ]);
  });

  it("Should get all available pets in the city with size and age filter", async () => {
    await orgsRepository.create({
      id: "org-01",
      address: "salvador",
      name: "teste",
      phone: "77777777777",
      email: "teste@example.com",
      password: '123456'
    });

    await petsRepository.create({
      name: "pet1",
      orgId: "org-01",
      available: true,
      age: 1,
      size: "MEDIUM",
    });

    await petsRepository.create({
      name: "pet2",
      orgId: "org-01",
      available: true,
      age: 2,
      size: "BIG",
    });

    await petsRepository.create({
      name: "pet4",
      orgId: "org-01",
      available: true,
      age: 2,
      size: "MEDIUM",
    });

    const { pets } = await sut.execute({
      city: "salvador",
      query: {
        size: "MEDIUM",
        age: 1,
      },
    });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual([
      expect.objectContaining({
        name: "pet1",
      }),
    ]);
  });
});
