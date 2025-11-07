import React from 'react';
import { cn } from '@/lib/utils';

type TableProps = React.ComponentPropsWithoutRef<'table'> & { children: React.ReactNode }
type TableSectionProps = React.ComponentPropsWithoutRef<'tbody'> & { children: React.ReactNode }
type TableRowProps = React.ComponentPropsWithoutRef<'tr'> & { children: React.ReactNode }
type TableHeadProps = React.ComponentPropsWithoutRef<'th'> & { children: React.ReactNode }
type TableCellProps = React.ComponentPropsWithoutRef<'td'> & { children?: React.ReactNode }

const Table: React.FC<TableProps> = ({ children, className, ...props }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className={cn('w-full divide-y divide-gray-200', className)} {...props}>
        {children}
      </table>
    </div>
  );
};

const TableHeader: React.FC<TableSectionProps> = ({ children, className, ...props }) => {
  return (
    <thead className={cn('bg-gray-50', className)} {...props}>
      {children}
    </thead>
  );
};

const TableBody: React.FC<TableSectionProps> = ({ children, className, ...props }) => {
  return (
    <tbody className={cn('bg-white divide-y divide-gray-200', className)} {...props}>
      {children}
    </tbody>
  );
};

const TableRow: React.FC<TableRowProps> = ({ children, className, ...props }) => {
  return (
    <tr className={cn('hover:bg-gray-50 transition-colors', className)} {...props}>
      {children}
    </tr>
  );
};

const TableHead: React.FC<TableHeadProps> = ({ children, className, ...props }) => {
  return (
    <th
      className={cn('px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider', className)}
      {...props}
    >
      {children}
    </th>
  );
};

const TableCell: React.FC<TableCellProps> = ({ children, className, ...props }) => {
  return (
    <td className={cn('px-6 py-4 whitespace-nowrap text-sm text-gray-900', className)} {...props}>
      {children}
    </td>
  );
};

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };