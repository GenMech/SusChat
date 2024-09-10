import mysql, { RowDataPacket } from "mysql2/promise";

export const executeQuery = async (
  query: string,
  data: any[] = []
): Promise<RowDataPacket[] | null> => {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "3306", 10),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    const [result] = await db.execute<RowDataPacket[]>(query, data);
    await db.end();
    return result;
  } catch (error) {
    console.error("Database query error:", error);
    return null;
  }
};
