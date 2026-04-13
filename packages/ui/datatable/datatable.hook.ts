import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { useState } from "react";

interface UseDataTableOptions<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  defaultPageSize?: number;
}

export function useDataTable<TData>({
  data,
  columns,
  defaultPageSize = 10,
}: UseDataTableOptions<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  });

  const handleSetPageSize = (size: number) => {
    setPageSize(size);
    table.setPageSize(size);
    table.setPageIndex(0);
  };

  return {
    table,
    sorting,
    setSorting,
    pageSize,
    setPageSize: handleSetPageSize,
  };
}
