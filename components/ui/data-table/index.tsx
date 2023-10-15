'use client';
import {
  RowData,
  TableOptions,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { Table as TableProps } from '@tanstack/table-core';
import { ForwardedRef, forwardRef, useImperativeHandle } from 'react';
import { Button } from '../button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../table';
import { DataTablePagination } from './pagination';
import { DataTableViewOptions } from './columns-toggle';

interface IDataTableProps<T extends RowData>
  extends Omit<TableOptions<T>, 'getCoreRowModel'> {}

const DataTable = forwardRef(
  <T extends RowData>(
    props: IDataTableProps<T>,
    ref: ForwardedRef<TableProps<T>>
  ) => {
    const { data, columns } = props;
    const table = useReactTable<T>({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
    });

    useImperativeHandle(ref, () => table);

    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="px-8 py-4">
          <DataTablePagination<T> table={table} />
        </div>
      </div>
    );
  }
);

DataTable.displayName = 'DataTable';

export default DataTable as <T extends RowData>(
  props: IDataTableProps<T>,
  ref: ForwardedRef<TableProps<T>>
) => JSX.Element;
