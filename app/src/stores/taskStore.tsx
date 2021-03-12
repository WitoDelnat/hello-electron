import { gql, GraphQLClient } from 'graphql-request';
import { makeAutoObservable } from 'mobx';
import { Task } from '../models/task';
import { getSdk } from './taskStore.graphql';

export class TaskStore {
  isLoading = true;
  readonly tasks: Task[] = [];
  readonly client: GraphQLClient;
  private sdk: ReturnType<typeof getSdk>;

  constructor(client: GraphQLClient) {
    makeAutoObservable(this);
    this.client = client;
    this.sdk = getSdk(client);
    this.init();
  }

  get ongoingTasks() {
    return this.tasks.filter((task) => task.status === 'ongoing');
  }

  get completedTasks() {
    return this.tasks.filter((task) => task.status === 'done');
  }

  async init() {
    const response = await this.sdk.loadTasks();
    const tasks = response.tasks.map((task) => {
      return new Task({
        id: task.id,
        name: task.name,
        status: task.status,
        client: this.client,
      });
    });
    this.tasks.push(...tasks);
    this.isLoading = false;
  }

  async createTask(name: string) {
    const response = await this.sdk.createTask({ input: { name } });
    const task = new Task({
      id: response.taskCreate.id,
      name: response.taskCreate.name,
      status: response.taskCreate.status,
      client: this.client,
    });
    this.tasks.push(task);
  }
}

gql`
  query loadTasks {
    tasks {
      id
      name
      status
    }
  }

  mutation createTask($input: TaskCreateInput!) {
    taskCreate(input: $input) {
      id
      name
      status
    }
  }
`;
