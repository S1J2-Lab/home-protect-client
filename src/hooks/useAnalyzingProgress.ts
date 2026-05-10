import { useEffect, useState } from 'react';
import { createAnalysisStream } from '../api/analyzing';
import { INITIAL_ANALYSIS_STEPS } from '../constants/analysisSteps';
import type { AnalysisStep, AnalysisStepId } from '../types/analysis';
import { ANALYSIS_ERROR_MESSAGES } from '../constants/analysisErrorMessages';

type AnalysisStreamMessage =
  | {
      step: AnalysisStepId;
      status: 'done';
    }
  | {
      step: 'complete';
    }
  | {
      step: 'error';
      errorCode: string;
    };

interface UseAnalyzingProgressParams {
  sessionId: string | null;
  retryKey: number;
  onComplete: () => void;
  onError: (message: string) => void;
}

export function useAnalyzingProgress({
  sessionId,
  retryKey,
  onComplete,
  onError,
}: UseAnalyzingProgressParams) {
  const [steps, setSteps] = useState<AnalysisStep[]>(INITIAL_ANALYSIS_STEPS);

  const completedCount = steps.filter((step) => step.status === 'done').length;
  const progress = Math.round((completedCount / steps.length) * 100);

  const resetProgress = () => {
    setSteps(INITIAL_ANALYSIS_STEPS);
  };

  const completeStep = (completedStepId: AnalysisStepId) => {
    setSteps((prevSteps) => {
      const completedIndex = prevSteps.findIndex(
        (step) => step.id === completedStepId,
      );

      if (completedIndex === -1) {
        return prevSteps;
      }

      return prevSteps.map((step, index) => {
        if (index <= completedIndex) {
          return { ...step, status: 'done' };
        }

        if (index === completedIndex + 1) {
          return { ...step, status: 'loading' };
        }

        return { ...step, status: 'pending' };
      });
    });
  };

  useEffect(() => {
    if (!sessionId) {
      onError(ANALYSIS_ERROR_MESSAGES.sessionIdMissing);
      return;
    }

    const eventSource = createAnalysisStream(sessionId);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as AnalysisStreamMessage;

        if (data.step === 'complete') {
          setSteps((prevSteps) =>
            prevSteps.map((step) => ({ ...step, status: 'done' })),
          );
          onComplete();
          eventSource.close();
          return;
        }

        if (data.step === 'error') {
          onError(ANALYSIS_ERROR_MESSAGES.analysisFailed);
          eventSource.close();
          return;
        }

        completeStep(data.step);
      } catch {
        onError(ANALYSIS_ERROR_MESSAGES.analysisFailed);
        eventSource.close();
      }
    };

    eventSource.onerror = () => {
      onError(ANALYSIS_ERROR_MESSAGES.streamConnectionError);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [sessionId, retryKey, onComplete, onError]);

  return {
    progress,
    steps,
    resetProgress,
  };
}
