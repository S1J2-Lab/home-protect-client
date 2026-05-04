import styled from '@emotion/styled';
import { Check, LoaderCircle } from 'lucide-react';
import type { AnalysisStep } from '../../../types/analysis';

interface AnalysisStepItemProps {
  step: AnalysisStep;
}

export function AnalysisStepItem({ step }: AnalysisStepItemProps) {
  return (
    <StepItem>
      <StatusIcon status={step.status}>
        {step.status === 'done' && <Check size={15} />}
        {step.status === 'loading' && <LoaderCircle size={15} />}
      </StatusIcon>

      <TextBox>
        <Title>{step.title}</Title>
        <Description>{step.description}</Description>
      </TextBox>

      <RightIconWrapper>
        {step.status === 'done' && <CheckIcon size={18} />}
        {step.status === 'loading' && <LoadingIcon size={18} />}
      </RightIconWrapper>
    </StepItem>
  );
}

const StepItem = styled.li`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const StatusIcon = styled.div<{ status: AnalysisStep['status'] }>`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  color: white;
  background-color: ${({ status, theme }) =>
    status === 'done'
      ? theme.colors.success
      : status === 'loading'
        ? theme.colors.primary
        : theme.colors.primarySoft};

  svg {
    animation: ${({ status }) =>
      status === 'loading' ? 'spin 1s linear infinite' : 'none'};
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const TextBox = styled.div`
  flex: 1;
  min-width: 0;
`;

const Title = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-weight: 600;
`;

const Description = styled.p`
  margin: 4px 0 0;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 12px;
  font-weight: 500;
`;

const CheckIcon = styled(Check)`
  color: ${({ theme }) => theme.colors.success};
  flex-shrink: 0;
`;

const LoadingIcon = styled(LoaderCircle)`
  color: ${({ theme }) => theme.colors.primary};

  flex-shrink: 0;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const RightIconWrapper = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;
