import { Org } from "prisma/generated/client";
import { OrgCreateInput } from "prisma/generated/models";
import { OrgsRepository } from "../orgsRepository";
import { prisma } from "@/lib/prisma";


export class PrismaOrgsRepository implements OrgsRepository {

    async create(data: OrgCreateInput): Promise<Org> {
        const org = await prisma.org.create({
            data
        });

        return org;
    }

    async findByEmail(email: string): Promise<Org | null> {
        const org = await prisma.org.findUnique({
            where: {
                email
            }
        });

        return org;
    }

    async findById(orgId: string): Promise<Org | null> {
        const org = await prisma.org.findUnique({
            where: {
                id: orgId
            }
        });

        return org;
    }

}