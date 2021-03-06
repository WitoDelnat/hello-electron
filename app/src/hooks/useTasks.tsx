import { useLocalStore } from 'mobx-react-lite';
import React from 'react';

export type Task = {
  id: string;
  name: string;
  status: 'ongoing' | 'done';
};

export function createTaskStore() {
  return {
    tasks: [
      {
        id: '1',
        name: 'Create app',
        status: 'done',
      },
      {
        id: '2',
        name: 'Create API',
        status: 'ongoing',
      },
      {
        id: '3',
        name: 'Setup deployment',
        status: 'ongoing',
      },
    ] as Task[],
    get ongoingTasks() {
      return this.tasks.filter((task) => task.status === 'ongoing');
    },
    get completedTasks() {
      return this.tasks.filter((task) => task.status === 'done');
    },
  };
}

const tasksContext = React.createContext<ReturnType<
  typeof createTaskStore
> | null>(null);

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const store = useLocalStore(createTaskStore);
  return (
    <tasksContext.Provider value={store}>{children}</tasksContext.Provider>
  );
};

export const useTaskStore = () => {
  const tasks = React.useContext(tasksContext);
  if (!tasks) throw new Error('useTaskStore must be used within a provider.');
  return tasks;
};
