import { InMemoryOrgRepository } from "../../repositories/InMemory/InMemoryOrgRepository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateOrgUseCase } from "./create";

let orgsRepository: InMemoryOrgRepository;
let sut: CreateOrgUseCase;

describe("Create ORG Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgRepository();
    sut = new CreateOrgUseCase(orgsRepository);
  });

  it("Should create an Org", async () => {
    const { org } = await sut.execute({
      address: "Salvador",
      name: "Minha org",
      phone: "71999999999",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("Should reject empty address", async () => {
    await expect(
      sut.execute({
        address: "",
        name: "Minha org",
        phone: "71999999999",
      }),
    ).rejects.toBeInstanceOf(Error)
  });

  it("Should reject empty phone", async () => {
    await expect(
      sut.execute({
        address: "Salvador",
        name: "Minha org",
        phone: "",
      }),
    ).rejects.toBeInstanceOf(Error)
  });
});
