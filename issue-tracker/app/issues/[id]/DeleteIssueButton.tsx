'use client';
import { Button } from '@radix-ui/themes';
import React from 'react';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <div>
      <Button color="red" >Delete</Button>
    </div>
  );
};

export default DeleteIssueButton;