import type { ResultData } from '../types/result';

const ANALYSIS_SESSION_ID_KEY = 'analysisSessionId';
const ANALYSIS_RESULT_KEY = 'analysisResult';

export function saveAnalysisSessionId(sessionId: string) {
  sessionStorage.setItem(ANALYSIS_SESSION_ID_KEY, sessionId);
}

export function getAnalysisSessionId() {
  return sessionStorage.getItem(ANALYSIS_SESSION_ID_KEY);
}

export function saveAnalysisResult(result: ResultData) {
  sessionStorage.setItem(ANALYSIS_RESULT_KEY, JSON.stringify(result));
}

export function getAnalysisResultFromStorage() {
  const storedResult = sessionStorage.getItem(ANALYSIS_RESULT_KEY);

  if (!storedResult) return null;

  try {
    return JSON.parse(storedResult) as ResultData;
  } catch {
    return null;
  }
}

export function clearAnalysisStorage() {
  sessionStorage.removeItem(ANALYSIS_SESSION_ID_KEY);
  sessionStorage.removeItem(ANALYSIS_RESULT_KEY);
}
