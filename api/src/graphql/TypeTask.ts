import { enumType, objectType } from "nexus";

export const EnumTaskStatus = enumType({
  name: "TaskStatus",
  members: ["ongoing", "done"],
});

export const TypeTask = objectType({
  name: "Task",
  definition(t) {
    t.id("id");
    t.string("name");
    t.field("status", { type: "TaskStatus" });
  },
});
