import { gql } from "graphql-request";
import { graphqlClient } from "../../api/graphql-client";
import { serializeDevice } from "../../serializers";
import type { GetDevicesResponse as RawGetDevicesResponse } from "./get-devices.types";
import type { GetDevicesResponse } from "../../entities";

const QUERY = gql`
  query GetDevices {
    devices {
      deviceId
      eventCount
      lastSeenAt
    }
  }
`;

export async function getDevices(): Promise<GetDevicesResponse> {
  const raw = await graphqlClient.request<RawGetDevicesResponse>(QUERY);
  return { devices: raw.devices.map(serializeDevice) };
}
