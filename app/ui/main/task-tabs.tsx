'use client';

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { TaskType } from '@/app/lib/definitions';
import { styled } from '@mui/material';

const CustomTabs = styled(Tabs)(() => ({
  '& .MuiTabs-indicator': {
    backgroundColor: 'transparent',
  },
}));

const CustomTab = styled(Tab)(() => ({
  '&.Mui-selected': {
    color: 'white',
    backgroundColor: '#d9adf2',
    borderRadius: '30px',
  },
  '&': {
    fontSize: 'large',
    fontFamily: 'inherit',
    fontWeight: 'bolder',
  },
}));

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
    <CustomTabs
      value={value}
      onChange={handleChange}
      aria-label="task-tab-panel-tabs"
      TabIndicatorProps={{ style: { background: '#FFFFF' } }}
    >
      {Object.keys(TaskType).map(function (tasktype: string, index: number) {
        return (
          <CustomTab
            key={`task-type-tab-${tasktype}-${index}`}
            label={tasktype}
            id={`task-type-tab-${index}`}
            aria-controls="task-tab-panel-${tasktype}"
          />
        );
      })}
    </CustomTabs>
  );
}
