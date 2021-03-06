import { Icon } from '@chakra-ui/react';
import React from 'react';

export function CheckedCheckbox() {
  return (
    <Icon viewBox="0 0 48 48" width="24px" height="24px" color="green.500">
      <path
        fill="currentColor"
        d="M24 4c12.15 0 22 9.85 22 22s-9.85 22-22 22S2 38.15 2 26 11.85 4 24 4zm0 4C14.059 8 6 16.059 6 26s8.059 18 18 18 18-8.059 18-18S33.941 8 24 8z"
      />
      <path
        fill="currentColor"
        d="M24 5c11.598 0 21 9.402 21 21s-9.402 21-21 21S3 37.598 3 26 12.402 5 24 5zm0 3.818C14.51 8.818 6.818 16.511 6.818 26c0 9.49 7.693 17.182 17.182 17.182 9.49 0 17.182-7.693 17.182-17.182 0-9.49-7.693-17.182-17.182-17.182z"
      />
      <path
        fill="currentColor"
        d="M24 2c12.15 0 22 9.85 22 22s-9.85 22-22 22S2 36.15 2 24 11.85 2 24 2zm12.293 11.293L21 28.586l-6.293-6.293-1.414 1.414L21 31.414l16.707-16.707-1.414-1.414z"
      />
    </Icon>
  );
}
