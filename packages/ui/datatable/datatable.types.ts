import type { ColumnDef, SortingState, Table } from '@tanstack/react-table';

export interface DataTableProps<TData> {
  data:            TData[];
  columns:         ColumnDef<TData, any>[];
  isLoading?:      boolean;
  defaultPageSize?: number;
}

export interface DataTableContextValue<TData = unknown> {
  table:    Table<TData>;
  columns:  ColumnDef<TData, any>[];
  sorting:  SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  pageSize: number;
  setPageSize: (size: number) => void;
  isLoading: boolean;
}

export interface DataTableBodyProps {
  emptyMessage?: string;
}

export interface DataTableFooterProps {
  rowsPerPageLabel?: string;
}
