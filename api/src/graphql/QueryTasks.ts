import { list, queryField } from "nexus";

export const QueryTasks = queryField("tasks", {
  type: list("Task"),
  resolve: async (_task, _args, ctx) => {
    const tasks = await ctx.tasks.getAll();
    return tasks;
  },
});
