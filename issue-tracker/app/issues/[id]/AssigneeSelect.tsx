'use client';

import {Flex, Select} from "@radix-ui/themes";
import React from "react";



const AssigneeSelect = () => {
  return (

        <Select.Root defaultValue="1">
        <Select.Trigger>
          <span>Select Assignee</span>
        </Select.Trigger>
        <Select.Content>
        
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="1">1</Select.Item>
            <Select.Item value="2">2</Select.Item>
          </Select.Group>
          <Select.Separator />
        </Select.Content>
     
      </Select.Root>

  );
};

export default AssigneeSelect;