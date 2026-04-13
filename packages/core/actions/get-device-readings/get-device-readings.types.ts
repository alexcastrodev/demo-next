export type {
  DeviceReadingsPage,
  GetDeviceReadingsResponse,
  SensorReading,
  TelemetryReading,
  WaterQualityReading,
} from "../../types/api";

export interface GetDeviceReadingsParams {
  deviceId: string;
  page?: number;
  perPage?: number;
}
