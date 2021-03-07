import { arg, inputObjectType, mutationField } from "nexus";
import { errors } from "../errors";

export const InputTaskUpdateStatus = inputObjectType({
  name: "TaskUpdateStatusInput",
  definition(t) {
    t.string("taskId");
    t.string("status");
  },
});

export const MutationTaskUpdateStatus = mutationField("taskUpdateStatus", {
  type: "Task",
  args: {
    input: arg({ type: "TaskUpdateStatusInput" }),
  },
  resolve: async (_, { input }, ctx) => {
    if (input.status !== "ongoing" && input.status !== "done") {
      throw errors.api.tasks.invalidStatus();
    }
    const task = await ctx.tasks.updateStatus(input.taskId, input.status);
    return task;
  },
});
