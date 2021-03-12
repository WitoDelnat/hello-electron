import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.global.css';
import { TaskList } from './components/taskList/TaskList';
import { TaskStoreProvider } from './hooks/TaskStoreProvider';

export default function App() {
  return (
    <Router>
      <ChakraProvider>
        <TaskStoreProvider>
          <Switch>
            <Route path="/" component={TaskList} />
          </Switch>
        </TaskStoreProvider>
      </ChakraProvider>
    </Router>
  );
}
