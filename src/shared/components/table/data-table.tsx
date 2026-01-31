import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table';
import { cn } from '@/shared/libs';
import { isEmpty } from 'lodash';
import { type ReactNode } from 'react';
import { EmptyTable } from './empty-table';
import LoadingTable from './loading-table';
export type DataTableColumn<T> = {
  label: string;
  key: keyof T | string;
  className?: string;
  header?: (col: string, colIndex: number) => ReactNode;
  render?: (row: T, rowIndex: number) => ReactNode;
};

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  limit?: number;
  rowKey?: (row: T, rowIndex: number) => string | number;
  isLoading?: boolean;
  className?: string;
  classNameHeader?: string;
}

export function DataTable<T>({
  columns,
  data,
  limit,
  rowKey,
  isLoading = false,
  className,
  classNameHeader,
}: Readonly<DataTableProps<T>>) {
  let tableBody: ReactNode;
  if (isLoading) {
    tableBody = (
      <TableBody className="space-y-2">
        <LoadingTable columns={columns.length} />
      </TableBody>
    );
  } else if (isEmpty(data)) {
    tableBody = (
      <TableBody className="space-y-2">
        <tr>
          <td colSpan={columns.length} className="text-center">
            <EmptyTable />
          </td>
        </tr>
      </TableBody>
    );
  } else {
    const tableData = limit == null ? data : data?.slice(0, limit);
    tableBody = (
      <TableBody className="space-y-2">
        {tableData?.map((row, rowIndex) => (
          <TableRow key={rowKey ? rowKey(row, rowIndex) : rowIndex}>
            {columns.map((col) => (
              <TableCell key={col.key as string} className={cn('text-foreground', col.className)}>
                {col.render ? col.render(row, rowIndex) : (row as any)[col.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );
  }

  return (
    <Table className={cn('bg-background', className)}>
      <TableHeader className={cn('bg-muted', classNameHeader)}>
        <TableRow>
          {columns.map((col, cIndex) => (
            <TableHead key={col.key as string} className={col.className}>
              {col?.header ? col?.header(col.label, cIndex) : col.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      {tableBody}
    </Table>
  );
}
