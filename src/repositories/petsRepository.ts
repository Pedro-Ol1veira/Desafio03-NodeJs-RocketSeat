import { Pet } from "prisma/generated/client";
import { PetUncheckedCreateInput } from "prisma/generated/models";

export interface Query {
  age: number | undefined;
  size: 'SMALL' | 'MEDIUM' | 'BIG' | undefined;
} 

export interface PetsRepository {
    create(data: PetUncheckedCreateInput): Promise<Pet>;
    findManyAvailable(address: string, query: Query): Promise<Pet[]>;
    findById(petId: string): Promise<Pet | null>;
    adoptAPet(petID: string): Promise<Pet>;
}