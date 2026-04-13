import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { createElement, type PropsWithChildren } from "react";
import { describe, expect, it, vi } from "vitest";

import { useGetLoggerEvents } from "../get-logger-events.hook";
import { getLoggerEvents } from "../get-logger-events.request";
import type {
  GetLoggerEventsParams,
  GetLoggerEventsResponse,
} from "../get-logger-events.types";
import paramsFixture from "./fixtures/get-logger-events.params.json";
import responseFixture from "./fixtures/get-logger-events.response.json";

vi.mock("../get-logger-events.request", () => ({
  getLoggerEvents: vi.fn(),
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return function Wrapper({ children }: PropsWithChildren) {
    return createElement(
      QueryClientProvider,
      { client: queryClient },
      children,
    );
  };
}

describe("useGetLoggerEvents", () => {
  it("returns paginated logger events from fixtures", async () => {
    const params = paramsFixture as GetLoggerEventsParams;
    const mockResponse = responseFixture as GetLoggerEventsResponse;

    vi.mocked(getLoggerEvents).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useGetLoggerEvents(params), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(getLoggerEvents).toHaveBeenCalledTimes(1);
    expect(getLoggerEvents).toHaveBeenCalledWith(params);
    expect(result.current.data).toEqual(mockResponse);
    expect(result.current.data?.data[0].device_id).toBe("DEV003");
    expect(result.current.data?.total_pages).toBe(20);
  });
});
