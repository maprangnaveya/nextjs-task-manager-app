'use client';

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TaskType } from '@/app/lib/definitions';

export default function TaskTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
      {Object.keys(TaskType).map(function (tasktype, index) {
        return (
          <Tab
            key={`task-type-tab-${tasktype}-${index}`}
            label={tasktype}
            id={`task-type-tab-${index}`}
            aria-controls="task-tab-paenl-${tasktype}"
          />
        );
      })}
    </Tabs>
  );
}
