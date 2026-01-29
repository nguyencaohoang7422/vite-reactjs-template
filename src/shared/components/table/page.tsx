import { columns, type Payment } from './columns';
import { DataTable } from './data-table';
const data: Payment[] = [
  {
    amount: 1000,
    email: '123',
    id: '123',
    status: 'pending',
  },
];
export default function DemoPage() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
