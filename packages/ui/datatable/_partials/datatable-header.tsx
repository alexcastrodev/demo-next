import { flexRender } from "@tanstack/react-table";
import { Group, Table, Text, UnstyledButton } from "@mantine/core";

import { useDataTableContext } from "../datatable.provider";

export function DataTableHeader() {
  const { table } = useDataTableContext();

  return (
    <Table.Thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <Table.Tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const canSort = header.column.getCanSort();
            const sorted = header.column.getIsSorted();

            return (
              <Table.Th key={header.id}>
                {header.isPlaceholder ? null : (
                  <UnstyledButton
                    onClick={
                      canSort
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                    style={{
                      cursor: canSort ? "pointer" : "default",
                      userSelect: "none",
                    }}
                  >
                    <Group gap={4} wrap="nowrap">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {canSort && (
                        <Text size="xs" c="dimmed">
                          {sorted === "asc"
                            ? "↑"
                            : sorted === "desc"
                              ? "↓"
                              : "↕"}
                        </Text>
                      )}
                    </Group>
                  </UnstyledButton>
                )}
              </Table.Th>
            );
          })}
        </Table.Tr>
      ))}
    </Table.Thead>
  );
}
