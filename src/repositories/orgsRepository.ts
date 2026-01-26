import { Org } from "prisma/generated/client";
import { OrgCreateInput } from "prisma/generated/models";

export interface OrgsRepository {
    create(data: OrgCreateInput): Promise<Org>;
}