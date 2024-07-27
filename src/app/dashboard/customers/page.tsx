'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { activityState } from '@/state/activities';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { useRecoilState } from 'recoil';

import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import { customers } from './constant';

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 30;

  const [activities, setActivities] = useRecoilState(activityState);
  const [act, setAct] = React.useState([]);
  const [date, setDate] = React.useState('');

  React.useEffect(() => {
    setAct(activities);
  }, [activities])

  const paginatedCustomers = applyPagination(act, page, rowsPerPage);

  function onFilter(): void {
    setAct(activities.filter((e) => e.name.substring(0,7) === date));
  }

  function onClear(): void {
    setDate("");
    setAct(activities);
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Aktifitas</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Link href="/pdf" target="_blank">
              <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
                Export pdf
              </Button>
            </Link>
            <div style={{ display: "flex", alignItems: "center" }}>
              <FormControl>
                <InputLabel>Bulan</InputLabel>
                <OutlinedInput value={date} onChange={(e) => { setDate(e.target.value) }} placeholder="" label="Tanggal" type="month" />
              </FormControl> 
              {date ? (
                <div>
                  <Button color="primary" onClick={onFilter}>Filter</Button>
                  <Button color="error" onClick={onClear}>X</Button>
                </div>
              ) : null}
            </div>
          </Stack>
        </Stack>
        <a href="/dashboard/activity-form">
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Tambah aktivitas
          </Button>
        </a>
      </Stack>
      <CustomersTable
        count={paginatedCustomers.length}
        page={page}
        rows={act}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: any[], page: number, rowsPerPage: number): any[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
