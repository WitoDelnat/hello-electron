import { list, queryField } from "nexus";
import { v4 as uuid } from "uuid";

const TASKS = [
  {
    id: uuid(),
    name: "Create backend",
    status: "ongoing",
  },
];

export const QueryTasks = queryField("tasks", {
  type: list("Task"),
  resolve: async () => {
    return TASKS;
  },
});
