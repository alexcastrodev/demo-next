import { api } from '../../api';
import type { GetStatsResponse } from './get-stats.types';

export async function getStats(): Promise<GetStatsResponse> {
  return api.get<GetStatsResponse>('/stats');
}
