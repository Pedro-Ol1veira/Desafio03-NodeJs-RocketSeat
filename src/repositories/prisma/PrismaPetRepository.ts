import { prisma } from "@/lib/prisma";
import { PetsRepository, Query } from "../petsRepository";
import { Pet } from "prisma/generated/client";
import { PetUncheckedCreateInput } from "prisma/generated/models";


export class PrismaPetRepository implements PetsRepository {

    async create(data: PetUncheckedCreateInput): Promise<Pet> {
        const pet = await prisma.pet.create({
            data
        });

        return pet;
    }

    async findById(petId: string): Promise<Pet | null> {
        const pet = await prisma.pet.findUnique({
            where: {
                id: petId
            }
        });

        return pet;
    }

    async findManyAvailable(address: string, query: Query): Promise<Pet[]> {
        const pets = await prisma.pet.findMany({
            where: {
                available: true,
                org: {
                    address: {
                        equals: address,
                        mode: 'insensitive',
                    }
                }
            }
        });

        return pets;
    }

    async adoptAPet(petID: string): Promise<Pet> {
        const pet = await prisma.pet.update({
            where: {
                id: petID
            },
            data: {
                available: true
            }
        });

        return pet;
    }

}