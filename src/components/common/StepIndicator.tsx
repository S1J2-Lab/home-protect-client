import styled from '@emotion/styled';
import { theme } from '../../styles/theme';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

type StepState = 'done' | 'active' | 'todo';

function getStepState(step: number, currentStep: number): StepState {
  if (step < currentStep) return 'done';
  if (step === currentStep) return 'active';
  return 'todo';
}

export function StepIndicator({
  currentStep,
  totalSteps = 4,
}: StepIndicatorProps) {
  return (
    <Container>
      <Row>
        <Line />

        {Array.from({ length: totalSteps }, (_, index) => {
          const step = index + 1;
          const state = getStepState(step, currentStep);

          return (
            <StepWrapper key={step} $state={state}>
              {state === 'done' ? <Check size={14} strokeWidth={3} /> : step}
            </StepWrapper>
          );
        })}
      </Row>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  background: ${theme.colors.surface};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const Line = styled.div`
  position: absolute;
  top: 50%;
  left: 14px;
  right: 14px;
  height: 2px;
  background: #e2e8f0;
  transform: translateY(-50%);
  z-index: 0;
`;

const StepWrapper = styled.div<{ $state: StepState }>`
  width: 28px;
  height: 28px;
  border-radius: ${theme.radius.full};

  display: inline-flex;
  align-items: center;
  justify-content: center;

  font-size: 13px;
  font-weight: 700;
  z-index: 1;

  background: ${({ $state }) =>
    $state === 'active' || $state === 'done'
      ? theme.colors.primary
      : '#E2E8F0'};

  color: ${({ $state }) =>
    $state === 'todo' ? theme.colors.textMuted : '#fff'};

  box-shadow: ${({ $state }) =>
    $state === 'active' ? `0 0 0 4px ${theme.colors.primaryLight}` : 'none'};
`;
