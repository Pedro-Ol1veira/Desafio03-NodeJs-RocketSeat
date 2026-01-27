import { Org } from "prisma/generated/client";
import { OrgCreateInput } from "prisma/generated/models";
import { OrgsRepository } from "../orgsRepository";
import { randomUUID } from "crypto";

export class InMemoryOrgRepository implements OrgsRepository {
  public items: Org[] = [];

  async create(data: OrgCreateInput): Promise<Org> {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      phone: data.phone,
      address: data.address,
      email: data.email,
      password: data.password
    };

    this.items.push(org);

    return org;
  }

  async findById(orgId: string): Promise<Org | null> {
    const org = this.items.find((item) => item.id === orgId);

    if (!org) return null;

    return org;
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.items.find(item => item.email === email);

    if(!org) return null;

    return org;
  }
}
