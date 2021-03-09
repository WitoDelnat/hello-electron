import { gql } from "graphql-request";
import { getSdk } from "./MutationTaskCreate.test.generated";
import { createTestContext } from "../utils/testing/createTestContext";
import faker from "faker";

gql`
  mutation createTask($input: TaskCreateInput!) {
    taskCreate(input: $input) {
      id
      name
      status
    }
  }

  query validateCreateTask {
    tasks {
      id
      name
      status
    }
  }
`;

const ctx = createTestContext(getSdk);

it("should create a task", async () => {
  const name = faker.random.words(2);

  const { taskCreate: task } = await ctx.client.createTask({
    input: {
      name,
    },
  });

  expect(task.id).toBeDefined();
  expect(task.name).toEqual(name);
  expect(task.status).toEqual("ongoing");

  const validation = await ctx.client.validateCreateTask();
  expect(validation.tasks.length).toEqual(1);
  expect(validation.tasks[0].name).toEqual(name);
});
