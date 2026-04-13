import type { UseMutationOptions } from "@tanstack/react-query";

export interface DeleteLoggerEventParams {
  id: number;
}

export interface DeleteLoggerEventResponse {
  id: number;
  deleted: boolean;
}

export type DeleteLoggerEventMutationProps = UseMutationOptions<
  DeleteLoggerEventResponse,
  Error,
  DeleteLoggerEventParams
>;
