import { objectType } from "nexus";

export const TypeTask = objectType({
  name: "Task",
  definition(t) {
    t.id("id");
    t.string("name");
    t.string("status");
  },
});
