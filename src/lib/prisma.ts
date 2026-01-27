import { PrismaClient } from "prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "@/env";

const connectionString = env.DATABASE_URL;

const url = new URL(connectionString);
export const schema = url.searchParams.get('schema');

const adapter = new PrismaPg({ connectionString }, { schema: schema ?? "public" });

export const prisma = new PrismaClient({ adapter });