import { useUserState } from "../../states/use-user-state";

export async function applyResponseInterceptor(
  response: Response,
): Promise<Response> {
  if (response.status === 401) {
    useUserState.getState().clear();
    localStorage.removeItem("token");
  }

  if (!response.ok) {
    throw response;
  }

  return response;
}
