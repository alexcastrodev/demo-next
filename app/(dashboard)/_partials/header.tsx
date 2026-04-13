'use client';

import { ActionIcon, Group, Paper, Text } from '@mantine/core';
import { IconDroplet, IconLogout } from '@tabler/icons-react';
import { useTranslation } from 'core/i18n';
import { useUserState } from 'core/states/use-user-state';
import { useRouter } from 'next/navigation';

export function Header() {
  const { t }  = useTranslation();
  const clear  = useUserState((s) => s.clear);
  const router = useRouter();

  const handleLogout = () => {
    clear();
    router.push('/login');
  };

  return (
    <Paper h="100%" px="md" radius="md" shadow="xs" withBorder>
      <Group h="100%" px="md" justify="space-between">
        <Group gap="xs">
          <IconDroplet size={24} color="var(--mantine-color-blue-6)" />
          <Text fw={700} size="lg">Dashboard</Text>
        </Group>
        <ActionIcon variant="subtle" color="gray" onClick={handleLogout} title={t('common.logout')}>
          <IconLogout size={18} />
        </ActionIcon>
      </Group>
    </Paper>
  );
}
