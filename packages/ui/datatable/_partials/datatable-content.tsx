import { Table } from '@mantine/core';

export function DataTableContent({ children }: { children: React.ReactNode }) {
  return (
    <Table.ScrollContainer minWidth={600}>
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        {children}
      </Table>
    </Table.ScrollContainer>
  );
}
