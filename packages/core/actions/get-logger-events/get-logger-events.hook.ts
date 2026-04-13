import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getLoggerEvents } from "./get-logger-events.request";
import type {
  GetLoggerEventsParams,
  GetLoggerEventsResponse,
} from "./get-logger-events.types";

export const getLoggerEventsKey = ["logger-events"];

export function useGetLoggerEvents(
  params: GetLoggerEventsParams = {},
  queryProps?: UseQueryOptions<GetLoggerEventsResponse>,
) {
  return useQuery<GetLoggerEventsResponse>({
    queryKey: [
      ...getLoggerEventsKey,
      params.page ?? null,
      params.per_page ?? null,
      params.device_id ?? null,
    ],
    queryFn: () => getLoggerEvents(params),
    ...queryProps,
  });
}
