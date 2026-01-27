import { OrgsRepository } from "@/repositories/orgsRepository";
import { compare } from "bcryptjs";
import { Org } from "prisma/generated/client";

interface authenticateUseCaseRequest {
  email: string;
  password: string;
}

interface authenticateUseCaseResponse {
  org: Org;
}

export class authenticateUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password
  }: authenticateUseCaseRequest): Promise<authenticateUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email);

    if(!org) throw new Error("Invalid Credentials");

    const doesPasswordMatch = await compare(password, org.password);
    
    if(!doesPasswordMatch) throw new Error("Invalid Credentials");

    return { org }
  }
}
