import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';

const statusMap = {
  ijin: { label: 'Ijin', color: 'primary' },
  sakit: { label: 'Sakit', color: 'warning' },
  hadir: { label: 'Hadir', color: 'success' },
  cuti: { label: 'Cuti', color: 'error' },
};

export interface Order {
  id: string;
  customer: { name: string };
  amount: number;
  status: 'cuti' | 'hadir' | 'sakit' | 'ijin';
  createdAt: Date;
}

export interface LatestOrdersProps {
  orders?: Order[];
  sx?: SxProps;
}

export function LatestOrders({ orders = [], sx }): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardHeader title="Aktivitas Terakhir" />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell sortDirection="desc">Tanggal</TableCell>
              <TableCell>Kehadiran</TableCell>
              <TableCell>Clock In</TableCell>
              <TableCell>Clock Out</TableCell>
              <TableCell>Deskripsi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              const { label, color } = statusMap[order.email] ?? { label: 'Unknown', color: 'default' };

              return (
                <TableRow hover key={order.id}>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>
                    <Chip color={color} label={label} size="small" />
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{order.clockin}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{order.clockout}</Typography>
                  </TableCell>
                  <TableCell>
                    {order.address.split(',').map((e) => (
                        <p key={e} style={{ margin: 0 }}>{e}</p>
                      ))}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
    </Card>
  );
}
