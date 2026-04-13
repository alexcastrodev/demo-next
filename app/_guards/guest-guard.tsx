'use client';

import { Loader, Stack } from '@mantine/core';
import { useUserState } from 'core/states/use-user-state';
import { useRouter } from 'next/navigation';
import { useEffect, type PropsWithChildren } from 'react';

export function GuestGuard({ children }: PropsWithChildren) {
  const hydrated = useUserState((state) => state.hydrated);
  const token = useUserState((state) => state.token);
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (token) {
      router.replace('/dashboard');
    }
  }, [hydrated, router, token]);

  if (!hydrated) {
    return (
      <Stack align="center" justify="center" mih="100vh">
        <Loader />
      </Stack>
    );
  }

  if (token) {
    return null;
  }

  return children;
}
