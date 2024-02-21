'use client';

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { TaskType } from '@/app/lib/definitions';

export default function TaskTabs() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const status: string = searchParams.get('status') || '';
    if (status) {
      const indexOfStatus = Object.keys(TaskType).indexOf(status);
      if (indexOfStatus >= 0) {
        setValue(Object.keys(TaskType).indexOf(status));
      }
    }
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);

    const params = new URLSearchParams(searchParams);
    if (newValue) {
      params.set('status', Object.keys(TaskType)[newValue]);
    } else {
      params.delete('status');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
      {Object.keys(TaskType).map(function (tasktype: string, index: number) {
        return (
          <Tab
            key={`task-type-tab-${tasktype}-${index}`}
            label={tasktype}
            id={`task-type-tab-${index}`}
            aria-controls="task-tab-paenl-${tasktype}"
            className="bg-purple-50"
          />
        );
      })}
    </Tabs>
  );
}
