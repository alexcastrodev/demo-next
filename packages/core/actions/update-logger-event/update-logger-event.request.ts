import { api } from "../../api";
import { serializeLoggerEvent } from "../../serializers";
import type {
  UpdateLoggerEventParams,
  UpdateLoggerEventResponse,
} from "./update-logger-event.types";
import type { LoggerEvent } from "../../entities";

export async function updateLoggerEvent({
  id,
  payload,
}: UpdateLoggerEventParams): Promise<LoggerEvent> {
  const raw = await api.patch<UpdateLoggerEventResponse>(
    `/iot-events/${id}`,
    payload,
  );
  return serializeLoggerEvent(raw);
}
