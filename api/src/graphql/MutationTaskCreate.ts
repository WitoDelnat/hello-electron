import { arg, inputObjectType, mutationField } from "nexus";

export const InputTaskCreate = inputObjectType({
  name: "TaskCreateInput",
  definition(t) {
    t.string("name");
  },
});

export const MutationTaskCreate = mutationField("taskCreate", {
  type: "Task",
  args: {
    input: arg({ type: "TaskCreateInput" }),
  },
  resolve: async (_, { input }, ctx) => {
    const task = await ctx.tasks.create({ name: input.name });
    return task;
  },
});
