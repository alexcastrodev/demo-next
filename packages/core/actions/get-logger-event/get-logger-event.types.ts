import type { LoggerEvent } from "../get-logger-events/get-logger-events.types";

export interface GetLoggerEventParams {
  id: number;
}

export type GetLoggerEventResponse = LoggerEvent;
