import { api } from "../../api";
import { buildQueryParams } from "../../utils/build-query-params";
import type {
  GetLoggerEventsParams,
  GetLoggerEventsResponse,
} from "./get-logger-events.types";

export async function getLoggerEvents(
  params: GetLoggerEventsParams = {},
): Promise<GetLoggerEventsResponse> {
  return api.get<GetLoggerEventsResponse>("/iot-events", {
    params: buildQueryParams(params),
  });
}
