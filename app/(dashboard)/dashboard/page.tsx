'use client';

import { Card, Grid, Group, Loader, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { IconActivity, IconDevices, IconDroplet, IconTemperature, IconWifi } from '@tabler/icons-react';
import { useTranslation } from 'core/i18n';
import { useGetStats } from 'core/actions/get-stats/get-stats.hook';

export default function DashboardPage() {
  const { t }               = useTranslation();
  const { data, isLoading } = useGetStats();

  if (isLoading) {
    return (
      <Stack align="center" pt="xl">
        <Loader />
      </Stack>
    );
  }

  return (
    <>
      <Title order={2} mb="lg">{t('dashboard.title')}</Title>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} mb="xl">
        <StatCard label={t('dashboard.totalEvents')}  value={data?.total_events   ?? 0} icon={<IconActivity size={20} />} color="blue" />
        <StatCard label={t('dashboard.totalDevices')} value={data?.total_devices  ?? 0} icon={<IconDevices  size={20} />} color="grape" />
        <StatCard label={t('dashboard.eventsToday')}  value={data?.events_today   ?? 0} icon={<IconWifi     size={20} />} color="teal" />
        <StatCard label={t('dashboard.eventsLast7d')} value={data?.events_last_7d ?? 0} icon={<IconActivity size={20} />} color="orange" />
      </SimpleGrid>

      <Title order={4} mb="md">{t('dashboard.sensorAverages')}</Title>
      <Grid mb="xl">
        <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
          <SensorCard label={t('dashboard.sensors.ph')}   value={data?.averages.ph}   unit=""      icon={<IconDroplet     size={18} />} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
          <SensorCard label={t('dashboard.sensors.tmp')}  value={data?.averages.tmp}  unit="°C"    icon={<IconTemperature size={18} />} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
          <SensorCard label={t('dashboard.sensors.cnd')}  value={data?.averages.cnd}  unit="µS/cm" icon={<IconWifi        size={18} />} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
          <SensorCard label={t('dashboard.sensors.ntu')}  value={data?.averages.ntu}  unit="NTU"   icon={<IconDroplet     size={18} />} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
          <SensorCard label={t('dashboard.sensors.vbat')} value={data?.averages.vbat} unit="V"     icon={<IconWifi        size={18} />} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
          <SensorCard label={t('dashboard.sensors.rssi')} value={data?.averages.rssi} unit="dBm"   icon={<IconWifi        size={18} />} />
        </Grid.Col>
      </Grid>

      <Title order={4} mb="md">{t('dashboard.eventsPerDevice')}</Title>
      <Stack gap="xs">
        {data?.events_per_device.map(({ device_id, count }) => (
          <Card key={device_id} withBorder padding="sm" radius="md">
            <Group justify="space-between">
              <Text fw={500}>{device_id}</Text>
              <Text size="sm" c="dimmed">{t('dashboard.events_count', { count })}</Text>
            </Group>
          </Card>
        ))}
      </Stack>
    </>
  );
}

function StatCard({ label, value, icon, color }: {
  label: string;
  value: number;
  icon:  React.ReactNode;
  color: string;
}) {
  return (
    <Card withBorder padding="lg" radius="md">
      <Group justify="space-between" mb="xs">
        <Text size="sm" c="dimmed">{label}</Text>
        <Text c={color}>{icon}</Text>
      </Group>
      <Text fw={700} size="xl">{value.toLocaleString('pt-BR')}</Text>
    </Card>
  );
}

function SensorCard({ label, value, unit, icon }: {
  label: string;
  value: number | null | undefined;
  unit:  string;
  icon:  React.ReactNode;
}) {
  return (
    <Card withBorder padding="md" radius="md">
      <Group gap="xs" mb={4}>
        <Text c="dimmed">{icon}</Text>
        <Text size="sm" c="dimmed">{label}</Text>
      </Group>
      <Text fw={600} size="lg">
        {value != null ? `${value} ${unit}`.trim() : '—'}
      </Text>
    </Card>
  );
}
