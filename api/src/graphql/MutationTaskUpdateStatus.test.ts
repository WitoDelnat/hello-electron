import { gql } from "graphql-request";
import { errors } from "../errors";
import { taskFixture } from "../modules/tasks/fixtures/task.fixture";
import { TaskStatus } from "../types.test.generated";
import { createTestContext } from "../utils/testing/createTestContext";
import { getSdk } from "./MutationTaskUpdateStatus.test.generated";
import faker from "faker";

gql`
  mutation updateTaskStatus($input: TaskUpdateStatusInput!) {
    taskUpdateStatus(input: $input) {
      id
      name
      status
    }
  }
`;

const ctx = createTestContext(getSdk);

it("should throw an error when the task does not exist", async () => {
  await expect(
    ctx.client.updateTaskStatus({
      input: {
        taskId: faker.random.uuid(),
        status: TaskStatus.Ongoing,
      },
    }),
  ).rejects.toThrow(errors.api.tasks.notFound.message);
});

it("should update the task's status", async () => {
  const task = await taskFixture().execute({ slonik: { pool: ctx.db } });

  expect(task.status).toEqual("ongoing");

  const response = await ctx.client.updateTaskStatus({
    input: {
      taskId: task.id,
      status: TaskStatus.Done,
    },
  });

  expect(response.taskUpdateStatus.id).toEqual(task.id);
  expect(response.taskUpdateStatus.status).toEqual("done");
});
