import {
  Box,
  ChakraProvider,
  Flex,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.global.css';
import { CheckedCheckbox } from './components/icons/CheckedCheckbox';
import { UncheckedCheckbox } from './components/icons/UncheckedCheckbox';

type Task = {
  id: string;
  name: string;
  status: 'ongoing' | 'done';
};

const TODO_LIST: Task[] = [
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
];

export default function App() {
  return (
    <Router>
      <ChakraProvider>
        <Switch>
          <Route path="/" component={TaskList} />
        </Switch>
      </ChakraProvider>
    </Router>
  );
}

function TaskList() {
  const ongoingTasks = TODO_LIST.filter((task) => task.status === 'ongoing');
  const completedTasks = TODO_LIST.filter((task) => task.status === 'done');

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
          <Heading size="lg">Ongoing</Heading>
          {ongoingTasks.map((task) => {
            return (
              <Flex key={task.id} mt="2">
                <UncheckedCheckbox />
                <Text ml="2">{task.name}</Text>
              </Flex>
            );
          })}
        </Box>

        {completedTasks.length === 0 ? undefined : (
          <Box>
            <Heading size="lg">Done</Heading>
            {completedTasks.map((task) => {
              return (
                <Flex key={task.id} mt="2">
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
}
