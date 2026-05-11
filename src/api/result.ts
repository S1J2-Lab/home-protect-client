import { apiClient } from './client';
import type { ResultResponse } from '../types/result';

export async function getAnalysisResult(sessionId: string) {
  const { data } = await apiClient.get<ResultResponse>('/analysis/result', {
    params: { sessionId },
  });

  return data.data;
}
