"use client";

import { Loader, Stack } from "@mantine/core";
import { useUserState } from "core/states/use-user-state";
import { useRouter } from "next/navigation";
import { useEffect, type PropsWithChildren } from "react";

export function AuthenticatedGuard({ children }: PropsWithChildren) {
  const hydrated = useUserState((state) => state.hydrated);
  const token = useUserState((state) => state.token);
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (!token) {
      router.replace("/login");
    }
  }, [hydrated, router, token]);

  if (!hydrated || !token) {
    return (
      <Stack align="center" justify="center" mih="100vh">
        <Loader />
      </Stack>
    );
  }

  return children;
}
