import { Box, Heading, VStack } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTaskStore } from '../../hooks/TaskStoreProvider';
import { AddTaskItem } from './AddTaskItem';
import { TaskItem } from './TaskItem';

export const TaskList = observer(() => {
  const taskStore = useTaskStore();

  return (
    <Box
      w="100%"
      h="100vh"
      bgGradient="linear(to-bl, green.200, pink.500)"
      overflow="hidden"
    >
      <VStack
        minWidth="xl"
        maxWidth="2xl"
        bg="white"
        alignItems="left"
        marginX="auto"
        marginTop="20"
        borderRadius="10"
        padding="4"
        spacing="6"
      >
        <AddTaskItem onSubmit={(name) => taskStore.createTask(name)} />

        {taskStore.ongoingTasks.length === 0 ? undefined : (
          <Box>
            <Heading size="lg">Ongoing</Heading>
            {taskStore.ongoingTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </Box>
        )}

        {taskStore.completedTasks.length === 0 ? undefined : (
          <Box>
            <Heading size="lg">Done</Heading>
            {taskStore.completedTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </Box>
        )}
      </VStack>
    </Box>
  );
});
