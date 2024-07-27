'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Chip } from '@mui/material';

const statusMap = {
  ijin: { label: 'Ijin', color: 'primary' },
  sakit: { label: 'Sakit', color: 'warning' },
  hadir: { label: 'Hadir', color: 'success' },
  cuti: { label: 'Cuti', color: 'error' },
};

export interface Customer {
  id: string;
  name: string;
  email: string;
  clockin: string;
  clockout: string;
  address: string;
}

interface CustomersTableProps {
  count?: number;
  page?: number;
  rows?: Customer[];
  rowsPerPage?: number;
  isPDf?: boolean;
}

export function CustomersTable({ rows = [], isPDf = false }: CustomersTableProps): React.JSX.Element {
  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Tanggal</TableCell>
              <TableCell>Kehadiran</TableCell>
              <TableCell>Clock In</TableCell>
              <TableCell>Clock Out</TableCell>
              <TableCell>Deskripsi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover key={row.id}>
                  <TableCell>
                    <Typography variant="subtitle2">{row.name}</Typography>
                  </TableCell>
                  <TableCell>
                    {!isPDf ? <Chip color={statusMap[row.email].color} label={statusMap[row.email].label} size="small" /> : <p>{statusMap[row.email].label}</p>}
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{row.clockin}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{row.clockout}</Typography>
                  </TableCell>
                  <TableCell>
                    {row.address.split(',').map((e) => (
                      <p key={e} style={{ margin: 0 }}>{e}</p>
                    ))}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
}
