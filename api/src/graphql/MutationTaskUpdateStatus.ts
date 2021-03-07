import { arg, inputObjectType, mutationField } from "nexus";

export const InputTaskUpdateStatus = inputObjectType({
  name: "TaskUpdateStatusInput",
  definition(t) {
    t.string("taskId");
    t.field("status", { type: "TaskStatus" });
  },
});

export const MutationTaskUpdateStatus = mutationField("taskUpdateStatus", {
  type: "Task",
  args: {
    input: arg({ type: "TaskUpdateStatusInput" }),
  },
  resolve: async (_, { input }, ctx) => {
    const task = await ctx.tasks.updateStatus(input.taskId, input.status);
    return task;
  },
});
