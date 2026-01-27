import { InMemoryOrgRepository } from "../../repositories/InMemory/InMemoryOrgRepository";
import { beforeEach, describe, expect, it } from "vitest";
import { registerPetUseCase } from "./register";
import { InMemoryPetRepository } from "@/repositories/InMemory/InMemoryPetRepository";

let orgsRepository: InMemoryOrgRepository;
let petsRepository: InMemoryPetRepository;
let sut: registerPetUseCase;

describe("Register A Pet Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgRepository();
    petsRepository = new InMemoryPetRepository(orgsRepository);
    sut = new registerPetUseCase(petsRepository, orgsRepository);
  });

  it("Should register a Pet", async () => {
    await orgsRepository.create({
      id: "org-01",
      address: "salvador",
      name: "teste",
      phone: "77777777777",
      email: "teste@example.com",
      password: '123456'
    });

    const { pet } = await sut.execute({
      name: "meu pet",
      breed: "SRD",
      age: 3,
      size: 'SMALL',
      orgId: "org-01",
    });

    expect(pet.id).toEqual(expect.any(String));
  });

  it("Should reject create a Pet with an inexistent Org", async () => {
    await expect(
      sut.execute({
        name: "meu pet",
        breed: "SRD",
        age: 2,
        size: 'BIG',
        orgId: "org-01",
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
