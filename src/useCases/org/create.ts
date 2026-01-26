import { OrgsRepository } from "@/repositories/orgsRepository";
import { Org } from "prisma/generated/client";

interface createOrgUseCaseRequest {
  phone: string;
  name: string;
  address: string;
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
  }: createOrgUseCaseRequest): Promise<createOrgUseCaseResponse> {

    if(!address) throw new Error("Endereço obrigatorio");
    if(!phone) throw new Error("Telefone obrigatorio");
    
    const org = await this.orgsRepository.create({
      address,
      name,
      phone,
    });

    return { org };
  }
}
