import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table';
import { cn } from '@/shared/libs';
import { type ReactNode } from 'react';

export type DataTableColumn<T> = {
  label: string;
  key: keyof T | string;
  className?: string;
  render?: (row: T, rowIndex: number) => ReactNode;
};

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  rowKey?: (row: T, rowIndex: number) => string | number;
  isLoading?: boolean;
}

export function DataTable<T>({ columns, data, rowKey, isLoading = false }: Readonly<DataTableProps<T>>) {
  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (!data || data?.length === 0) {
    return <div>Empty</div>;
  }
  return (
    <Table className="bg-background">
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col.key as string} className={col.className}>
              {col.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((row, rowIndex) => (
          <TableRow key={rowKey ? rowKey(row, rowIndex) : rowIndex}>
            {columns.map((col) => (
              <TableCell key={col.key as string} className={cn('text-foreground', col.className)}>
                {col.render ? col.render(row, rowIndex) : (row as any)[col.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
