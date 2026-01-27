import { InMemoryOrgRepository } from "../../repositories/InMemory/InMemoryOrgRepository";
import { beforeEach, describe, expect, it } from "vitest";
import { authenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";

let orgsRepository: InMemoryOrgRepository;
let sut: authenticateUseCase;

describe("Authenticate ORG Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgRepository();
    sut = new authenticateUseCase(orgsRepository);
  });

  it("Should authenticate an org", async () => {
    await orgsRepository.create({
      address: "Salvador",
      name: "Minha org",
      phone: "71999999999",
      email: "teste@example.com",
      password: await hash("123456", 6),
    });

    const { org } = await sut.execute({
      email: "teste@example.com",
      password: "123456",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("Should not authenticate an org with wrong email", async () => {
    await orgsRepository.create({
      address: "Salvador",
      name: "Minha org",
      phone: "71999999999",
      email: "teste@example.com",
      password: await hash("123456", 6),
    });

    await expect(
      sut.execute({
        email: "teste3@example.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it("Should not authenticate an org with wrong password", async () => {
    await orgsRepository.create({
      address: "Salvador",
      name: "Minha org",
      phone: "71999999999",
      email: "teste@example.com",
      password: await hash("123456", 6),
    });

    await expect(
      sut.execute({
        email: "teste@example.com",
        password: "1234563",
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
