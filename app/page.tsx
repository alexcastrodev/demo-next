"use client";

import { Loader, Stack } from "@mantine/core";
import { useUserState } from "core/states/use-user-state";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const hydrated = useUserState((state) => state.hydrated);
  const token = useUserState((state) => state.token);
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    router.replace(token ? "/dashboard" : "/login");
  }, [hydrated, router, token]);

  return (
    <Stack align="center" justify="center" mih="100vh">
      <Loader />
    </Stack>
  );
}
