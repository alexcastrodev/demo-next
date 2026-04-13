import type { ColumnDef, SortingState, Table } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    sticky?: "right" | "left";
  }
}

export interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  isLoading?: boolean;
  defaultPageSize?: number;
  manualSorting?: boolean;
  onSortingChange?: (sorting: SortingState) => void;
  manualPagination?: boolean;
  pageCount?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

export interface DataTableContextValue<TData = unknown> {
  table: Table<TData>;
  columns: ColumnDef<TData, unknown>[];
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  pageSize: number;
  setPageSize: (size: number) => void;
  setPageIndex: (index: number) => void;
  isLoading: boolean;
}

export interface DataTableBodyProps {
  emptyMessage?: string;
}

export interface DataTableFooterProps {
  rowsPerPageLabel?: string;
}
