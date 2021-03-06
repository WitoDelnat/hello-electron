import { useLocalStore } from 'mobx-react-lite';
import React from 'react';
import { v4 as uuid } from 'uuid';

export type Task = {
  id: string;
  name: string;
  status: 'ongoing' | 'done';
};

export function createTaskStore() {
  return {
    tasks: [
      {
        id: uuid(),
        name: 'Create app',
        status: 'done',
      },
      {
        id: uuid(),
        name: 'Create API',
        status: 'ongoing',
      },
      {
        id: uuid(),
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
    toggleTask(id: string) {
      const task = this.tasks.find((t) => t.id === id);
      if (!task) return;
      task.status = task.status === 'done' ? 'ongoing' : 'done';
    },
    createTask(name: string) {
      this.tasks.push({
        id: uuid(),
        name,
        status: 'ongoing',
      });
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
