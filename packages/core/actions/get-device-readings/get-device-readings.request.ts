import { gql } from "graphql-request";
import { graphqlClient } from "../../api/graphql-client";
import type {
  GetDeviceReadingsParams,
  GetDeviceReadingsResponse,
} from "./get-device-readings.types";

const QUERY = gql`
  query GetDeviceReadings($deviceId: String!, $page: Int, $perPage: Int) {
    deviceReadings(deviceId: $deviceId, page: $page, perPage: $perPage) {
      total
      page
      perPage
      totalPages
      data {
        __typename
        ... on WaterQualityReading {
          id
          deviceId
          recordedAt
          ph
          conductivity
          turbidity
          temperature
        }
        ... on TelemetryReading {
          id
          deviceId
          recordedAt
          battery
          satellites
          signalStrength
        }
      }
    }
  }
`;

export async function getDeviceReadings(
  params: GetDeviceReadingsParams,
): Promise<GetDeviceReadingsResponse> {
  return graphqlClient.request<GetDeviceReadingsResponse>(QUERY, params);
}
