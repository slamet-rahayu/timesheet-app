'use client';

import React, { useState } from 'react';
import { activityState } from '@/state/activities';
import { Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';

export default function Page(): React.JSX.Element {
  const [name, setName] = useState(''); //tanggal
  const [email, setEmail] = useState('hadir'); //presensi
  const [address, setAddress] = useState(''); //deskripsi
  const [clockIn, setClockIn] = useState(''); //clockin
  const [clockOut, setClockOut] = useState(''); //clockout
  const [activity, setActivity] = useRecoilState(activityState);

  const router = useRouter();

  function onSubmit(): void {
    setActivity([
      ...activity,
      {
        id: `ID-${activity.length + 1}`,
        name,
        email,
        address,
        clockin: clockIn,
        clockout: clockOut,
      },
    ]);
    router.replace('/dashboard/customers');
  }

  return (
    <Stack>
      <Typography variant="h4">Tambah Aktifitas</Typography>
      <Grid container spacing={2} mt={2}>
        <Grid item md={6}>
          <Stack spacing={2}>
            <FormControl>
              <InputLabel>Tanggal</InputLabel>
              <OutlinedInput
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder=""
                label="Tanggal"
                type="date"
              />
            </FormControl>
            <FormControl>
              <InputLabel>Clock In</InputLabel>
              <OutlinedInput
                onChange={(e) => {
                  setClockIn(e.target.value);
                }}
                placeholder=""
                label="Tanggal"
                type="time"
              />
            </FormControl>
            <FormControl>
              <InputLabel>Clock Out</InputLabel>
              <OutlinedInput
                onChange={(e) => {
                  setClockOut(e.target.value);
                }}
                placeholder=""
                label="Tanggal"
                type="time"
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Presensi</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Presensi"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              >
                <MenuItem value="hadir">Hadir</MenuItem>
                <MenuItem value="sakit">Sakit</MenuItem>
                <MenuItem value="ijin">Ijin</MenuItem>
                <MenuItem value="cuti">Cuti</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>Deskripsi</InputLabel>
              <OutlinedInput
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                placeholder="Deskripsi"
                multiline
                label="Deskripsi"
                type="text"
                sx={{ height: '100px' }}
              />
            </FormControl>
            <Button onClick={onSubmit} type="submit" variant="contained">
              Simpan
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
