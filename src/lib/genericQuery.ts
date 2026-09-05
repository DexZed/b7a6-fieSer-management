import { Prisma } from '../generated/prisma/index.js';
import { prisma } from './prisma.js';

export async function saveRecord(
  tableName: string,
  data: Prisma.UserCreateInput,
): Promise<any> {
  try {
    const table = (prisma as Record<string, any>)[tableName];
    if (!table) {
      throw new Error(`Table ${tableName} not found`);
    }
    const result = table.create({ data });
    return result;
  } catch (error) {
    console.error(
      `Something went wrong while saving on ${tableName}, ${error}`,
    );
  }
}
export async function updateRecord(
  tableName: string,
  id: number,
  data: Prisma.UserUpdateInput,
): Promise<any> {
  try {
    const table = (prisma as Record<string, any>)[tableName];
    if (!table) {
      throw new Error(`Table ${tableName} not found`);
    }
    const result = table.update({ where: { id }, data });
    return result;
  } catch (error) {
    console.error(
      `Something went wrong while updating on ${tableName}, ${error}`,
    );
  }
}
export async function deleteRecord(
  tableName: string,
  id: number,
): Promise<any> {
  try {
    const table = (prisma as Record<string, any>)[tableName];
    if (!table) {
      throw new Error(`Table ${tableName} not found`);
    }
    const result = table.delete({ where: { id } });
    return result;
  } catch (error) {
    console.error(
      `Something went wrong while deleting on ${tableName}, ${error}`,
    );
  }
}

export async function getRecord(tableName: string, id: number): Promise<any> {
  try {
    const table = (prisma as Record<string, any>)[tableName];
    if (!table) {
      throw new Error(`Table ${tableName} not found`);
    }
    const result = table.findUnique({ where: { id } });
    return result;
  } catch (error) {
    console.error(
      `Something went wrong while getting on ${tableName}, ${error}`,
    );
  }
}

export async function getRecordMany(
  tableName: string,
  params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  },
): Promise<any> {
  try {
    const table = (prisma as Record<string, any>)[tableName];
    if (!table) {
      throw new Error(`Table ${tableName} not found`);
    }
    const result = table.findMany(params);
    return result;
  } catch (error) {
    console.error(
      `Something went wrong while getting on ${tableName}, ${error}`,
    );
  }
}
