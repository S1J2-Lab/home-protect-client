import styled from '@emotion/styled';
import type { AnalysisStep } from '../../../types/analysis';
import { AnalysisStepItem } from './AnalysisStepItem';

interface AnalysisStepListProps {
  steps: AnalysisStep[];
}

export function AnalysisStepList({ steps }: AnalysisStepListProps) {
  return (
    <StepCard>
      <StepList>
        {steps.map((step) => (
          <AnalysisStepItem key={step.id} step={step} />
        ))}
      </StepList>
    </StepCard>
  );
}

const StepCard = styled.section`
  margin-top: 25px;
  padding: 23px 21px;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.soft};
`;

const StepList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 25px;
  list-style: none;
  margin: 0;
  padding: 0;
`;
