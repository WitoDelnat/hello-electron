import { gql, GraphQLClient } from 'graphql-request';
import { makeAutoObservable } from 'mobx';
import { TaskStatus } from '../types.graphql';
import { getSdk } from './task.graphql';

type TaskInit = {
  id: string;
  name: string;
  status: 'ongoing' | 'done';
  client: GraphQLClient;
};

export class Task {
  public readonly id: string;
  public name: string;
  public status: 'ongoing' | 'done';
  private client: ReturnType<typeof getSdk>;

  constructor(init: TaskInit) {
    makeAutoObservable(this);
    this.id = init.id;
    this.name = init.name;
    this.status = init.status;
    this.client = getSdk(init.client);
  }

  get isChecked() {
    return this.status === 'done';
  }

  async toggle() {
    this.status = this.status === 'ongoing' ? 'done' : 'ongoing';

    await this.client.updateStatus({
      input: {
        taskId: this.id,
        status: this.status === 'done' ? TaskStatus.Done : TaskStatus.Ongoing,
      },
    });
  }
}

gql`
  mutation updateStatus($input: TaskUpdateStatusInput!) {
    taskUpdateStatus(input: $input) {
      id
      name
      status
    }
  }
`;
