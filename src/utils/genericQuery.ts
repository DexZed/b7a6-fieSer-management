import { db } from '../prisma/db.js';

export async function checkRecordExistence(
  tableName: string,
  selectionFields: string[],
  filter: Record<string, unknown>,
): Promise<any> {
  try {
    const table = (db.sql.public as Record<string, any>)[tableName];

    if (!table) {
      throw new Error(
        `Table ${tableName} does not exist in the public schema.`,
      );
    }

    const record = await table
      .select(...selectionFields)
      .where((f: any, fns: any) => {
        const conditions = Object.entries(filter).map(([key, value]) =>
          fns.eq(f[key], value),
        );
        return fns.and(...conditions);
      })
      .build();

    const result = await db.runtime().execute(record);
    return result;
  } catch (error) {
    console.error(`Error checking record existence in ${tableName}:`, error);
    return false;
  }
}

export async function saveRecord(tableName: string, recordData: any) {
  try {
    const table = (db.sql.public as Record<string, any>)[tableName];

    if (!table) {
      throw new Error(
        `Table ${tableName} does not exist in the public schema.`,
      );
    }

    const result = await table.insert(recordData).build();
    return result;
  } catch (error) {
    console.error(`Error saving record to ${tableName}:`, error);
    return false;
  }
}
