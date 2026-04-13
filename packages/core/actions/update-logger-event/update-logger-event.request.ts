import { api } from "../../api";
import type {
  UpdateLoggerEventParams,
  UpdateLoggerEventResponse,
} from "./update-logger-event.types";

export async function updateLoggerEvent({
  id,
  payload,
}: UpdateLoggerEventParams): Promise<UpdateLoggerEventResponse> {
  return api.patch<UpdateLoggerEventResponse>(`/iot-events/${id}`, payload);
}
