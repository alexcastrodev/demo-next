import type { Result } from "../../common/result";
import type { LoggerEvent } from "../../types/api";

export type { LoggerEvent } from "../../types/api";

export interface GetLoggerEventsParams {
  page?: number;
  per_page?: number;
  device_id?: string;
  sort_by?: string;
  sort_dir?: "asc" | "desc";
}

export type GetLoggerEventsResponse = Result<LoggerEvent>;
