import { taskFixture } from "../modules/tasks/fixtures/task.fixture";
import { createTestContext } from "../utils/testing/createTestContext";
import { gql } from "graphql-request";

const ctx = createTestContext();

const query = gql`
  {
    tasks {
      id
      name
      status
    }
  }
`;

it("should return an empty array when there are no tasks", async () => {
  const data = await ctx.client.request(query);
  expect(data.tasks.length).toBe(0);
});

it("should return tasks", async () => {
  const tasks = await taskFixture()
    .list(3)
    .execute({ slonik: { pool: ctx.db } });

  const data = await ctx.client.request(query);

  expect(data.tasks.length).toBe(3);
  expect(data.tasks[0].id).toEqual(tasks[0].id);
  expect(data.tasks[0].name).toEqual(tasks[0].name);
  expect(data.tasks[0].status).toEqual(tasks[0].status);
});
