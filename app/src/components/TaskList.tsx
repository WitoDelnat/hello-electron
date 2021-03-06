import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTaskStore } from '../hooks/useTasks';
import { CheckedCheckbox } from './icons/CheckedCheckbox';
import { UncheckedCheckbox } from './icons/UncheckedCheckbox';

export const TaskList = observer(() => {
  const {
    ongoingTasks,
    completedTasks,
    toggleTask,
    createTask,
  } = useTaskStore();
  const [newTaskName, setNewTaskName] = React.useState<string>('');

  return (
    <Box w="100%" h="100%" bgGradient="linear(to-bl, green.200, pink.500)">
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
        <Box>
          <InputGroup>
            <Input
              type="tel"
              placeholder="Add a new task"
              onChange={(event) => setNewTaskName(event.target.value)}
              value={newTaskName}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => {
                  createTask(newTaskName);
                  setNewTaskName('');
                }}
              >
                add
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>

        {ongoingTasks.length === 0 ? undefined : (
          <Box>
            <Heading size="lg">Ongoing</Heading>

            {ongoingTasks.map((task) => {
              return (
                <Flex key={task.id} mt="2" onClick={() => toggleTask(task.id)}>
                  <UncheckedCheckbox />
                  <Text ml="2">{task.name}</Text>
                </Flex>
              );
            })}
          </Box>
        )}

        {completedTasks.length === 0 ? undefined : (
          <Box>
            <Heading size="lg">Done</Heading>
            {completedTasks.map((task) => {
              return (
                <Flex key={task.id} mt="2" onClick={() => toggleTask(task.id)}>
                  <CheckedCheckbox />
                  <Text ml="2">{task.name}</Text>
                </Flex>
              );
            })}
          </Box>
        )}
      </VStack>
    </Box>
  );
});
