import { fixture } from "../../../utils/testing/fluse";
import { createTask, Task } from "../sql";
import faker from "faker";

export const taskFixture = fixture<Task>({
  create: async ({ slonik }) => {
    return createTask(slonik, {
      id: faker.random.uuid(),
      name: faker.random.words(2),
    });
  },
});
