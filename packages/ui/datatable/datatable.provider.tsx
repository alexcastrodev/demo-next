import { createContext, useContext } from 'react';
import { Box } from '@mantine/core';

import { useDataTable } from './datatable.hook';
import type { DataTableContextValue, DataTableProps } from './datatable.types';

export const DataTableContext = createContext<DataTableContextValue | null>(null);

export function useDataTableContext<TData = unknown>() {
  const ctx = useContext(DataTableContext) as DataTableContextValue<TData> | null;
  if (!ctx) throw new Error('DataTable compound components must be used inside <DataTable>');
  return ctx;
}

export function DataTableProvider<TData>({
  data,
  columns,
  isLoading = false,
  defaultPageSize = 10,
  children,
}: DataTableProps<TData> & { children: React.ReactNode }) {
  const { table, sorting, setSorting, pageSize, setPageSize } = useDataTable({ data, columns, defaultPageSize });

  return (
    <DataTableContext.Provider
      value={{ table, columns, sorting, setSorting, pageSize, setPageSize, isLoading } as any}
    >
      <Box>{children}</Box>
    </DataTableContext.Provider>
  );
}
