/* eslint-disable eslint-comments/require-description */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePDF } from 'react-to-pdf';

import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import type { Customer } from '@/components/dashboard/customer/customers-table';

import { customers } from '../dashboard/customers/constant';
import styles from './styles.module.scss';

function applyPagination(rows: any, page: number, rowsPerPage: number): Customer[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}

export default function PdfPage(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 30;

  const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

  const router = useRouter();

  const { toPDF, targetRef } = usePDF({ filename: 'report.pdf' });

  useEffect(() => {
    // toPDF();
    // setTimeout(() => {
    //   router.back();
    // }, 200);
  }, []);

  return (
    <div style={{ marginLeft: '18%', marginRight: '18%', paddingBottom: "50px" }}>
      <div style={{ marginTop: '50px' }}>
        <h1>Pratinjau Dokumen</h1>
        <button
          style={{ 
            border: 'none', 
            padding: '12px 16px', 
            borderRadius: '12px', 
            color: 'white', 
            background: 'blue',
            marginBottom: "20px",
            cursor: "pointer"
          }}
          type="button"
          onClick={() => { toPDF() }}
        >
          Cetak
        </button>
      </div>
      <div style={{ border: "1px solid" }}>
        <div className={styles.container} ref={targetRef}>
          <div style={{ textAlign: 'center', marginBottom: '90px', paddingTop: '100px' }}>
            <h2>Timesheet Bulanan</h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h4>Nama Karyawan: </h4>
              <span>&nbsp;Slamet Rahayu</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h4>Bulan: </h4>
              <span>&nbsp;Juli 2024</span>
            </div>
          </div>
          <div>
            <CustomersTable
              isPDf
              count={paginatedCustomers.length}
              page={page}
              rows={paginatedCustomers}
              rowsPerPage={rowsPerPage}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '80px', paddingBottom: '80px' }}>
            <div style={{ width: '15%' }}>
              <p>Karyawan</p>
              <p style={{ borderTop: '1px solid black', marginTop: '100px' }}>Slamet Rahayu</p>
            </div>
            {/* <div style={{ width: '15%' }}>
              <p>Supervisor</p>
              <p style={{ borderTop: '1px solid black', marginTop: '100px' }}>Djoko</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
