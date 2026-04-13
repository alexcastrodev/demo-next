import { gql } from "graphql-request";
import { graphqlClient } from "../../api/graphql-client";
import type { GetDevicesResponse } from "./get-devices.types";

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
  return graphqlClient.request<GetDevicesResponse>(QUERY);
}
