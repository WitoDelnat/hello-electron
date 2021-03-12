import { GraphQLClient } from 'graphql-request';
import React from 'react';
import { TaskStore } from '../stores/taskStore';

const TaskStoreContext = React.createContext<TaskStore | null>(null);

export const TaskStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <TaskStoreContext.Provider
      value={new TaskStore(new GraphQLClient('http://localhost:8080/graphql'))}
    >
      {children}
    </TaskStoreContext.Provider>
  );
};

export const useTaskStore = () => {
  const taskStore = React.useContext(TaskStoreContext);
  if (!taskStore) {
    throw new Error('useTaskStore must be used within a provider.');
  }
  return taskStore;
};
