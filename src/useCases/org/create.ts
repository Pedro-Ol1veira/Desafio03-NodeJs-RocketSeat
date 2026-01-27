import { OrgsRepository } from "@/repositories/orgsRepository";
import { hash } from "bcryptjs";
import { Org } from "prisma/generated/client";

interface createOrgUseCaseRequest {
  phone: string;
  name: string;
  address: string;
  email: string;
  password: string;
}

interface createOrgUseCaseResponse {
  org: Org;
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    address,
    name,
    phone,
    email,
    password
  }: createOrgUseCaseRequest): Promise<createOrgUseCaseResponse> {

    if(!address) throw new Error("Endereço obrigatorio");
    if(!phone) throw new Error("Telefone obrigatorio");
    
    const passwordHash = await hash(password, 6);
    
    const org = await this.orgsRepository.create({
      address,
      name,
      phone,
      email,
      password: passwordHash
    });

    return { org };
  }
}
