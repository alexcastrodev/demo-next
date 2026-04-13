import { flexRender } from "@tanstack/react-table";
import { Center, Loader, Table, Text } from "@mantine/core";

import { useDataTableContext } from "../datatable.provider";
import type { DataTableBodyProps } from "../datatable.types";

export function DataTableBody({
  emptyMessage = "Nenhum resultado encontrado.",
}: DataTableBodyProps) {
  const { table, columns, isLoading } = useDataTableContext();
  const rows = table.getRowModel().rows;

  return (
    <Table.Tbody>
      {isLoading ? (
        <Table.Tr>
          <Table.Td colSpan={columns.length}>
            <Center py="xl">
              <Loader size="sm" />
            </Center>
          </Table.Td>
        </Table.Tr>
      ) : rows.length === 0 ? (
        <Table.Tr>
          <Table.Td colSpan={columns.length}>
            <Center py="xl">
              <Text c="dimmed" size="sm">
                {emptyMessage}
              </Text>
            </Center>
          </Table.Td>
        </Table.Tr>
      ) : (
        rows.map((row) => (
          <Table.Tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Table.Td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Td>
            ))}
          </Table.Tr>
        ))
      )}
    </Table.Tbody>
  );
}
