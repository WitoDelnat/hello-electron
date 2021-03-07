import { v4 as uuid } from "uuid";
import { DatabasePool } from "../../utils/database";
import { createTask, getAllTasks, Task, updateTask } from "./sql";

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

  updateStatus(taskId: string, status: Task["status"]): Promise<Task> {
    return updateTask(this.database, taskId, { status });
  }

  create({ name }: { name: string }): Promise<Task> {
    return createTask(this.database, {
      id: uuid(),
      name,
    });
  }
}
