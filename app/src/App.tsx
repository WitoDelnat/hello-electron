import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.global.css';
import { TaskList } from './components/TaskList';
import { TasksProvider } from './hooks/useTasks';

export default function App() {
  return (
    <Router>
      <ChakraProvider>
        <TasksProvider>
          <Switch>
            <Route path="/" component={TaskList} />
          </Switch>
        </TasksProvider>
      </ChakraProvider>
    </Router>
  );
}
