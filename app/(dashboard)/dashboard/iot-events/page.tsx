"use client";

import { useMemo, useState } from "react";
import { ActionIcon, Group, Stack, Title, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import { useTranslation } from "core/i18n";
import { useGetLoggerEvents } from "core/actions/get-logger-events/get-logger-events.hook";
import { useDeleteLoggerEvent } from "core/actions/delete-logger-event/delete-logger-event.hook";
import { useQueryClient } from "@tanstack/react-query";
import { getLoggerEventsKey } from "core/actions/get-logger-events/get-logger-events.hook";
import type { LoggerEvent } from "core/actions/get-logger-events/get-logger-events.types";
import { DataTable } from "ui/datatable";
import { EditLoggerEventModal } from "./_partials/edit-logger-event-modal";

export default function IotEventsPage() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [editingEvent, setEditingEvent] = useState<LoggerEvent | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const queryParams = {
    page: page + 1,
    per_page: perPage,
    ...(sorting[0] && {
      sort_by: sorting[0].id,
      sort_dir: sorting[0].desc ? ("desc" as const) : ("asc" as const),
    }),
  };

  const { data, isFetching } = useGetLoggerEvents(queryParams);

  const { mutate: deleteEvent } = useDeleteLoggerEvent({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getLoggerEventsKey });
      notifications.show({
        message: t("iotEvents.deleteSuccess"),
        color: "green",
      });
    },
    onError: () => {
      notifications.show({
        message: t("iotEvents.deleteError"),
        color: "red",
      });
    },
  });

  const columns = useMemo<ColumnDef<LoggerEvent, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: t("iotEvents.columns.id"),
        enableSorting: true,
        size: 70,
      },
      {
        accessorKey: "device_id",
        header: t("iotEvents.columns.deviceId"),
        enableSorting: true,
        size: 180,
      },
      {
        accessorKey: "key_tag",
        header: t("iotEvents.columns.keyTag"),
        enableSorting: true,
        size: 120,
      },
      {
        accessorKey: "key_ph",
        header: t("iotEvents.columns.ph"),
        enableSorting: true,
        size: 80,
      },
      {
        accessorKey: "key_tmp",
        header: t("iotEvents.columns.tmp"),
        enableSorting: true,
        size: 180,
      },
      {
        accessorKey: "key_cnd",
        header: t("iotEvents.columns.cnd"),
        enableSorting: true,
        size: 200,
      },
      {
        accessorKey: "created_at",
        header: t("iotEvents.columns.createdAt"),
        enableSorting: true,
        size: 200,
        cell: ({ getValue }) => {
          const value = getValue<string>();
          return value ? new Date(value).toLocaleString() : "-";
        },
      },
      {
        id: "actions",
        header: "",
        enableSorting: false,
        size: 90,
        meta: { sticky: "right" },
        cell: ({ row }) => {
          const event = row.original;
          return (
            <Group gap="xs" justify="flex-end">
              <Tooltip label={t("common.edit")}>
                <ActionIcon
                  variant="subtle"
                  color="blue"
                  onClick={() => setEditingEvent(event)}
                >
                  <IconEdit size={16} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label={t("common.delete")}>
                <ActionIcon
                  variant="subtle"
                  color="red"
                  onClick={() =>
                    modals.openConfirmModal({
                      title: t("iotEvents.deleteConfirmTitle"),
                      children: t("iotEvents.deleteConfirmMessage"),
                      labels: {
                        confirm: t("common.delete"),
                        cancel: t("common.cancel"),
                      },
                      confirmProps: { color: "red" },
                      onConfirm: () => deleteEvent({ id: event.id }),
                    })
                  }
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Tooltip>
            </Group>
          );
        },
      },
    ],
    [t, deleteEvent],
  );

  return (
    <>
      <Title order={2} mb="lg">
        {t("iotEvents.title")}
      </Title>

      <Stack>
        <DataTable
          data={data?.data ?? []}
          columns={columns}
          isLoading={isFetching}
          defaultPageSize={perPage}
          manualSorting
          onSortingChange={setSorting}
          manualPagination
          pageCount={data?.total_pages ?? 0}
          onPageChange={setPage}
          onPageSizeChange={(size) => {
            setPerPage(size);
            setPage(0);
          }}
        >
          <DataTable.Content>
            <DataTable.Header />
            <DataTable.Body emptyMessage={t("common.empty")} />
          </DataTable.Content>
          <DataTable.Footer rowsPerPageLabel={t("iotEvents.rowsPerPage")} />
        </DataTable>
      </Stack>

      {editingEvent && (
        <EditLoggerEventModal
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
        />
      )}
    </>
  );
}
