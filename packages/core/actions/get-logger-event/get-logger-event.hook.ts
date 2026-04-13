import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getLoggerEvent } from "./get-logger-event.request";
import type {
  GetLoggerEventParams,
  GetLoggerEventResponse,
} from "./get-logger-event.types";

export const getLoggerEventKey = ["logger-event"];

export function useGetLoggerEvent(
  params: GetLoggerEventParams,
  queryProps?: UseQueryOptions<GetLoggerEventResponse>,
) {
  return useQuery<GetLoggerEventResponse>({
    queryKey: [...getLoggerEventKey, params.id],
    queryFn: () => getLoggerEvent(params),
    ...queryProps,
  });
}
