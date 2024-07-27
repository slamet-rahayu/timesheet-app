'use client'

import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';

import { Budget } from '@/components/dashboard/overview/budget';
import { LatestOrders } from '@/components/dashboard/overview/latest-orders';
import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
import { Typography } from '@mui/material';
import { useRecoilState } from 'recoil';
import { activityState } from '@/state/activities';

export default function Page(): React.JSX.Element {

  const [activity] = useRecoilState(activityState);

  const activities = activity.slice(0,10);

  return (
    <Grid container spacing={3}>
      <Grid lg={12}>
        <Typography variant="h4">Bulan Ini</Typography>
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <Budget diff={12} trend="up" sx={{ height: '100%' }} value="20 hari" />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalCustomers diff={16} trend="down" sx={{ height: '100%' }} value="0 hari" />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TasksProgress sx={{ height: '100%' }} value="2 hari" />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalProfit sx={{ height: '100%' }} value="0 hari" />
      </Grid>
      <Grid lg={12} md={12} xs={12}>
        <LatestOrders
          orders={activities}
          sx={{ height: '100%' }}
        />
      </Grid>
    </Grid>
  );
}
