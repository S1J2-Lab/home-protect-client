import { useEffect, useState } from 'react';
import { INITIAL_ANALYSIS_STEPS } from '../constants/analysisSteps';
import type { AnalysisStep } from '../types/analysis';

export function useAnalysisProgress() {
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState<AnalysisStep[]>(INITIAL_ANALYSIS_STEPS);

  const resetProgress = () => {
    setProgress(0);
    setSteps(INITIAL_ANALYSIS_STEPS);
  };

  function updateStepStatus(nextProgress: number) {
    setSteps((prevSteps) =>
      prevSteps.map((step, index) => {
        const stepProgress = (index + 1) * 20;

        if (nextProgress >= stepProgress) {
          return { ...step, status: 'done' };
        }

        if (nextProgress >= stepProgress - 20) {
          return { ...step, status: 'loading' };
        }

        return { ...step, status: 'pending' };
      }),
    );
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }

        const next = Math.min(prev + 2, 100);
        updateStepStatus(next);
        return next;
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  return {
    progress,
    steps,
    isCompleted: progress === 100,
    resetProgress,
  };
}
