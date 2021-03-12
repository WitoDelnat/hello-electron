import {
  Box,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import React from 'react';

type Props = {
  onSubmit: (name: string) => void;
};

export const AddTaskItem = ({ onSubmit }: Props) => {
  const [newTaskName, setNewTaskName] = React.useState<string>('');

  return (
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
              onSubmit(newTaskName);
              setNewTaskName('');
            }}
          >
            add
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};
