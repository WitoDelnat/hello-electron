import { entries, isDate, isNil, isObject, isUndefined } from "lodash";
import { NotFoundError, SerializableValueType, sql } from "slonik";
import { errors } from "../../errors";
import { Database } from "../../utils/database";
import { logger } from "../../utils/logger";
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

export async function createTask(
  db: Database,
  { id, name }: { id: string; name: string },
): Promise<Task> {
  const task = await db.one<Task>(sql`
    INSERT INTO "public"."tasks" ("id", "name")
    VALUES (${sql.join([id, name], sql`, `)})
    RETURNING *;
  `);
  return task;
}

type Updatable = Partial<Omit<Task, "id">>;
export async function updateTask(db: Database, id: string, updatable: Updatable): Promise<Task> {
  try {
    const sets = entries(updatable).map(
      ([key, value]) => sql`${sql.identifier([key])} = ${serialize(value)}`,
    );

    const task = await db.one<Task>(sql`
      UPDATE "public"."tasks" SET ${sql.join(sets, sql`, `)}
      WHERE "id" = ${id}
      RETURNING *;
    `);
    return task;
  } catch (err) {
    if (err instanceof NotFoundError) {
      throw errors.api.tasks.notFound();
    } else {
      throw err;
    }
  }
}

function serialize(value: unknown) {
  if (isNil(value)) return sql`${null}`;
  if (isDate(value)) return sql`${value.toJSON()}`;
  if (isObject(value)) return sql.json(value as SerializableValueType);
  return sql`${value as string}`;
}
