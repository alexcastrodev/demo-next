import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { getStats } from './get-stats.request';
import type { GetStatsResponse } from './get-stats.types';

export const getStatsKey = ['stats'];

export function useGetStats(queryProps?: UseQueryOptions<GetStatsResponse>) {
  return useQuery<GetStatsResponse>({
    queryKey: getStatsKey,
    queryFn:  getStats,
    ...queryProps,
  });
}
