import { api } from "../../api";
import type {
  GetLoggerEventParams,
  GetLoggerEventResponse,
} from "./get-logger-event.types";

export async function getLoggerEvent({
  id,
}: GetLoggerEventParams): Promise<GetLoggerEventResponse> {
  return api.get<GetLoggerEventResponse>(`/iot-events/${id}`);
}
