import { GraphQLClient } from "graphql-request";
import { API_BASE_URL } from "../constants";
import { useUserState } from "../states/use-user-state";

export const graphqlClient = new GraphQLClient(`${API_BASE_URL}/graphql`, {
  requestMiddleware: (request) => {
    const token = useUserState.getState().token;
    return {
      ...request,
      headers: {
        ...request.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };
  },
});
