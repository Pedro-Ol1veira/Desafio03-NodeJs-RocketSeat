import { Org } from "prisma/generated/client";
import { OrgCreateInput } from "prisma/generated/models";
import { OrgsRepository } from "../orgsRepository";
import { randomUUID } from "crypto";


export class InMemoryOrgRepository implements OrgsRepository {

    public items: Org[] = [];
    
    async create(data: OrgCreateInput): Promise<Org> {
        const org = {
            id: randomUUID(),
            name: data.name,
            phone: data.phone,
            address: data.address
        };

        this.items.push(org);

        return org;
    }
}