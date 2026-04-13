"use client";

import { useEffect } from "react";
import { Button, Group, Modal, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "core/i18n";
import { useUpdateLoggerEvent } from "core/actions/update-logger-event/update-logger-event.hook";
import { getLoggerEventsKey } from "core/actions/get-logger-events/get-logger-events.hook";
import type { LoggerEvent } from "core/actions/get-logger-events/get-logger-events.types";
import type { UpdateLoggerEventPayload } from "core/actions/update-logger-event/update-logger-event.types";

type SensorFields = Pick<
  UpdateLoggerEventPayload,
  | "key_ncy"
  | "key_ph"
  | "key_mtu"
  | "key_tur"
  | "key_cnd"
  | "key_tmp"
  | "key_ntu"
  | "key_vbat"
  | "key_nsat"
  | "key_rssi"
  | "sensor_data"
>;

interface EditLoggerEventModalProps {
  event: LoggerEvent;
  onClose: () => void;
}

export function EditLoggerEventModal({
  event,
  onClose,
}: EditLoggerEventModalProps) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const form = useForm<SensorFields>({
    initialValues: {
      key_ncy: event.key_ncy,
      key_ph: event.key_ph,
      key_mtu: event.key_mtu,
      key_tur: event.key_tur,
      key_cnd: event.key_cnd,
      key_tmp: event.key_tmp,
      key_ntu: event.key_ntu,
      key_vbat: event.key_vbat,
      key_nsat: event.key_nsat,
      key_rssi: event.key_rssi,
      sensor_data: event.sensor_data,
    },
  });

  useEffect(() => {
    form.setValues({
      key_ncy: event.key_ncy,
      key_ph: event.key_ph,
      key_mtu: event.key_mtu,
      key_tur: event.key_tur,
      key_cnd: event.key_cnd,
      key_tmp: event.key_tmp,
      key_ntu: event.key_ntu,
      key_vbat: event.key_vbat,
      key_nsat: event.key_nsat,
      key_rssi: event.key_rssi,
      sensor_data: event.sensor_data,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event.id]);

  const { mutate: updateEvent, isPending } = useUpdateLoggerEvent({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getLoggerEventsKey });
      notifications.show({
        message: t("iotEvents.updateSuccess"),
        color: "green",
      });
      onClose();
    },
    onError: () => {
      notifications.show({
        message: t("iotEvents.updateError"),
        color: "red",
      });
    },
  });

  const handleSubmit = (values: SensorFields) => {
    updateEvent({
      id: event.id,
      payload: {
        key_tag: event.key_tag,
        device_id: event.device_id,
        ...values,
      },
    });
  };

  return (
    <Modal opened onClose={onClose} title={t("iotEvents.editTitle")} size="lg">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <NumberInput
          label={t("iotEvents.columns.ph")}
          mb="sm"
          decimalScale={2}
          {...form.getInputProps("key_ph")}
        />
        <NumberInput
          label={t("iotEvents.columns.tmp")}
          mb="sm"
          decimalScale={2}
          {...form.getInputProps("key_tmp")}
        />
        <NumberInput
          label={t("iotEvents.columns.cnd")}
          mb="sm"
          decimalScale={2}
          {...form.getInputProps("key_cnd")}
        />
        <NumberInput
          label={t("iotEvents.columns.ntu")}
          mb="sm"
          decimalScale={2}
          {...form.getInputProps("key_ntu")}
        />
        <NumberInput
          label={t("iotEvents.columns.vbat")}
          mb="sm"
          decimalScale={2}
          {...form.getInputProps("key_vbat")}
        />
        <NumberInput
          label={t("iotEvents.columns.rssi")}
          mb="sm"
          {...form.getInputProps("key_rssi")}
        />
        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button type="submit" loading={isPending}>
            {t("common.save")}
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
