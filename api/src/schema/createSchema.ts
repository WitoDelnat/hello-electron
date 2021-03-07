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
  });
}
