"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ActionIcon, Group, Stack, Title, Tooltip } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import type { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "core/i18n";
import { useGetDeviceReadings } from "core/actions/get-device-readings/get-device-readings.hook";
import type { SensorReading } from "core/actions/get-device-readings/get-device-readings.types";
import { DataTable } from "ui/datatable";

export default function DeviceDetailPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { deviceId } = useParams<{ deviceId: string }>();
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const { data, isFetching } = useGetDeviceReadings({
    deviceId,
    page: page + 1,
    perPage,
  });

  const columns = useMemo<ColumnDef<SensorReading, unknown>[]>(
    () => [
      {
        id: "type",
        header: t("deviceReadings.columns.type"),
        size: 180,
        enableSorting: false,
        cell: ({ row }) => row.original.__typename,
      },
      {
        accessorKey: "recordedAt",
        header: t("deviceReadings.columns.recordedAt"),
        size: 180,
        enableSorting: true,
        cell: ({ getValue }) => new Date(getValue<string>()).toLocaleString(),
      },
      {
        id: "ph",
        header: t("deviceReadings.columns.ph"),
        size: 80,
        enableSorting: false,
        cell: ({ row }) =>
          row.original.__typename === "WaterQualityReading"
            ? (row.original.ph ?? "—")
            : "—",
      },
      {
        id: "conductivity",
        header: t("deviceReadings.columns.conductivity"),
        size: 130,
        enableSorting: false,
        cell: ({ row }) =>
          row.original.__typename === "WaterQualityReading"
            ? (row.original.conductivity ?? "—")
            : "—",
      },
      {
        id: "turbidity",
        header: t("deviceReadings.columns.turbidity"),
        size: 110,
        enableSorting: false,
        cell: ({ row }) =>
          row.original.__typename === "WaterQualityReading"
            ? (row.original.turbidity ?? "—")
            : "—",
      },
      {
        id: "temperature",
        header: t("deviceReadings.columns.temperature"),
        size: 120,
        enableSorting: false,
        cell: ({ row }) =>
          row.original.__typename === "WaterQualityReading"
            ? (row.original.temperature ?? "—")
            : "—",
      },
      {
        id: "battery",
        header: t("deviceReadings.columns.battery"),
        size: 90,
        enableSorting: false,
        cell: ({ row }) =>
          row.original.__typename === "TelemetryReading"
            ? (row.original.battery ?? "—")
            : "—",
      },
      {
        id: "satellites",
        header: t("deviceReadings.columns.satellites"),
        size: 100,
        enableSorting: false,
        cell: ({ row }) =>
          row.original.__typename === "TelemetryReading"
            ? (row.original.satellites ?? "—")
            : "—",
      },
      {
        id: "signalStrength",
        header: t("deviceReadings.columns.signalStrength"),
        size: 130,
        enableSorting: false,
        cell: ({ row }) =>
          row.original.__typename === "TelemetryReading"
            ? (row.original.signalStrength ?? "—")
            : "—",
      },
    ],
    [t],
  );

  return (
    <>
      <Group align="center" mb="lg" gap="xs">
        <Tooltip label={t("common.back")}>
          <ActionIcon variant="subtle" onClick={() => router.back()}>
            <IconArrowLeft size={18} />
          </ActionIcon>
        </Tooltip>
        <Title order={2}>{deviceId}</Title>
      </Group>

      <DataTable
        data={data?.deviceReadings.data ?? []}
        columns={columns}
        isLoading={isFetching}
        defaultPageSize={perPage}
        manualPagination
        pageCount={data?.deviceReadings.totalPages ?? 0}
        onPageChange={setPage}
        onPageSizeChange={(size) => { setPerPage(size); setPage(0); }}
      >
        <DataTable.Content>
          <DataTable.Header />
          <DataTable.Body emptyMessage={t("common.empty")} />
        </DataTable.Content>
        <DataTable.Footer />
      </DataTable>
    </>
  );
}
