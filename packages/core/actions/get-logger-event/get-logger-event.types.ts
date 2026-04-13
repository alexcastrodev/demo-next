import type { LoggerEvent as RawLoggerEvent } from "../../types/api";
import type { LoggerEvent } from "../../entities";
import type { ActionByIdParams } from "../_shared/action.types";

export interface GetLoggerEventParams extends ActionByIdParams {}

export type GetLoggerEventRawResponse = RawLoggerEvent;

export type GetLoggerEventResponse = LoggerEvent;
