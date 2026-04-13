import type { LoggerEvent as RawLoggerEvent } from "../../types/api";
import type { LoggerEvent } from "../../entities";

export interface GetLoggerEventParams {
  id: number;
}

export type GetLoggerEventRawResponse = RawLoggerEvent;

export type GetLoggerEventResponse = LoggerEvent;
