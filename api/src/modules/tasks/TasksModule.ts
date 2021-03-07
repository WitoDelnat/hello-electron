import { DatabasePool } from "../../utils/database";
import { getAllTasks, Task } from "./sql";

export type TasksModuleInit = {
  database: DatabasePool;
};

export class TasksModule {
  private database: DatabasePool;

  constructor(init: TasksModuleInit) {
    this.database = init.database;
  }

  getAll(): Promise<Task[]> {
    return getAllTasks(this.database);
  }
}
