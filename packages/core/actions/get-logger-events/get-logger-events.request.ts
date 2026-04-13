import { api } from '../../api';
import type {
  GetLoggerEventsParams,
  GetLoggerEventsResponse,
} from './get-logger-events.types';

export async function getLoggerEvents(
  params: GetLoggerEventsParams = {}
): Promise<GetLoggerEventsResponse> {
  const queryParams: Record<string, string | number | boolean> = {};

  if (params.page !== undefined) {
    queryParams.page = params.page;
  }

  if (params.per_page !== undefined) {
    queryParams.per_page = params.per_page;
  }

  if (params.device_id) {
    queryParams.device_id = params.device_id;
  }

  return api.get<GetLoggerEventsResponse>('/iot-events', {
    params: queryParams,
  });
}
