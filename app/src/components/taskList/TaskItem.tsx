import { Flex, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Task } from '../../models/task';
import { CheckedCheckbox } from '../icons/CheckedCheckbox';
import { UncheckedCheckbox } from '../icons/UncheckedCheckbox';

export const TaskItem = observer(({ task }: { task: Task }) => {
  return (
    <Flex key={task.id} mt="2" onClick={() => task.toggle()}>
      {task.isChecked ? <CheckedCheckbox /> : <UncheckedCheckbox />}
      <Text ml="2">{task.name}</Text>
    </Flex>
  );
});
