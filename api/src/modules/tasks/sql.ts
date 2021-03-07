import { sql } from "slonik";
import { Database } from "../../utils/database";
import { mutable } from "../../utils/types";

export type Task = {
  id: string;
  name: string;
  status: "ongoing" | "done";
};

export async function getAllTasks(db: Database): Promise<Task[]> {
  const tasks = await db.many<Task>(sql`SELECT * FROM "tasks"`);
  return mutable(tasks);
}
