import type { UseMutationOptions } from "@tanstack/react-query";
import type { LoggerEvent as RawLoggerEvent } from "../../types/api";
import type { LoggerEvent } from "../../entities";

export interface UpdateLoggerEventPayload {
  key_tag: string;
  device_id: string;
  key_ncy: number | null;
  key_ph: number | null;
  key_mtu: number | null;
  key_tur: number | null;
  key_cnd: number | null;
  key_tmp: number | null;
  key_ntu: number | null;
  key_vbat: number | null;
  key_nsat: number | null;
  key_rssi: number | null;
  sensor_data: string | null;
}

export interface UpdateLoggerEventParams {
  id: number;
  payload: UpdateLoggerEventPayload;
}

export type UpdateLoggerEventRawResponse = RawLoggerEvent;

export type UpdateLoggerEventResponse = LoggerEvent;

export type UpdateLoggerEventMutationProps = UseMutationOptions<
  UpdateLoggerEventResponse,
  Error,
  UpdateLoggerEventParams
>;
