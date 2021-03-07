import { makeSchema } from "nexus";
import path from "path";
import * as types from "../graphql";

export function createSchema() {
  return makeSchema({
    types,
    nonNullDefaults: {
      input: true,
      output: true,
    },
    outputs: {
      schema: path.join(__dirname, "../../docs/schema.graphql"),
      typegen: path.join(__dirname, "../nexus.generated.d.ts"),
    },
    contextType: {
      module: path.join(__dirname, "./createContext.ts"),
      export: "Context",
    },
    sourceTypes: {
      modules: [
        {
          module: path.join(__dirname, "../modules/tasks/sql.ts"),
          alias: "Tasks",
        },
      ],
    },
  });
}
