import { taskFixture } from "../modules/tasks/fixtures/task.fixture";
import { createTestContext } from "../utils/testing/createTestContext";
import { gql } from "graphql-request";
import { getSdk } from "./QueryTasks.test.generated";

gql`
  query getTasks {
    tasks {
      id
      name
      status
    }
  }
`;

const ctx = createTestContext(getSdk);

it("should return an empty array when there are no tasks", async () => {
  const data = await ctx.client.getTasks();
  expect(data.tasks.length).toBe(0);
});

it("should return tasks", async () => {
  const tasks = await taskFixture()
    .list(3)
    .execute({ slonik: { pool: ctx.db } });

  const data = await ctx.client.getTasks();

  expect(data.tasks.length).toBe(3);
  expect(data.tasks[0].id).toEqual(tasks[0].id);
  expect(data.tasks[0].name).toEqual(tasks[0].name);
  expect(data.tasks[0].status).toEqual(tasks[0].status);
});
