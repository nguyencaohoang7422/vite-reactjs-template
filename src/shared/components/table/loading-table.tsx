import React from 'react';
import { Skeleton } from '../ui';

interface LoadingTableProps {
  columns: number;
  rows?: number;
  className?: string;
}

const LoadingTable: React.FC<LoadingTableProps> = ({ columns, rows = 5, className }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <tr key={rowIdx} className="">
          {Array.from({ length: columns }).map((_, colIdx) => (
            <td key={colIdx}>
              <Skeleton className="h-[80%] w-[80%]" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default LoadingTable;
