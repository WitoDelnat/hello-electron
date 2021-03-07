import { TasksModule } from "../modules/tasks";
import { DatabasePool } from "../utils/database";

export type Context = ReturnType<typeof createContext>;

export function createContext({ database }: { database: DatabasePool }) {
  return {
    tasks: new TasksModule({ database }),
  };
}
