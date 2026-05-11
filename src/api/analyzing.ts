import { BASE_URL } from './config';

export function createAnalysisStream(sessionId: string) {
  const encodedSessionId = encodeURIComponent(sessionId);

  return new EventSource(
    `${BASE_URL}/analysis/stream?sessionId=${encodedSessionId}`,
  );
}
