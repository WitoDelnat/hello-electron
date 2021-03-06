import { Icon } from '@chakra-ui/react';
import React from 'react';

export function UncheckedCheckbox() {
  return (
    <Icon viewBox="0 0 48 48" width="24px" height="24px" color="gray.600">
      <path
        fill="currentColor"
        d="M24 2c12.15 0 22 9.85 22 22s-9.85 22-22 22S2 36.15 2 24 11.85 2 24 2zm0 4C14.059 6 6 14.059 6 24s8.059 18 18 18 18-8.059 18-18S33.941 6 24 6z"
      />
      <path
        fill="currentColor"
        d="M24 3c11.598 0 21 9.402 21 21s-9.402 21-21 21S3 35.598 3 24 12.402 3 24 3zm0 3.818C14.51 6.818 6.818 14.511 6.818 24c0 9.49 7.693 17.182 17.182 17.182 9.49 0 17.182-7.693 17.182-17.182 0-9.49-7.693-17.182-17.182-17.182z"
      />
    </Icon>
  );
}
