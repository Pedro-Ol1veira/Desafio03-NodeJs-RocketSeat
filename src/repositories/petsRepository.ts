import { Pet } from "prisma/generated/client";
import { PetUncheckedCreateInput } from "prisma/generated/models";

export interface PetsRepository {
    create(data: PetUncheckedCreateInput): Promise<Pet>;
    findManyAvailable(address: string): Promise<Pet[]>;
}