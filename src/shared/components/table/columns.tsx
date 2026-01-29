// This type is used to define the shape of our data.

import type { DataTableColumn } from './data-table';

// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export const columns: DataTableColumn<Payment>[] = [
  {
    label: 'ID',
    key: 'id',
  },
  {
    label: 'Email',
    key: 'email',
  },
  {
    label: 'Amount',
    key: 'amount',
    render: (row) => <span>{row.amount.toLocaleString()} đ</span>,
  },
  {
    label: 'Status',
    key: 'status',
    render: (row) => (
      <span
        style={{
          color: row.status === 'success' ? 'green' : row.status === 'failed' ? 'red' : 'orange',
        }}>
        {row.status}
      </span>
    ),
  },
  {
    label: 'Actions',
    key: 'actions',
    render: (row) => <button onClick={() => alert(`Edit ${row.id}`)}>Edit</button>,
  },
];
