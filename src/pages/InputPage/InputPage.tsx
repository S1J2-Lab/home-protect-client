import styled from '@emotion/styled';
import { useState } from 'react';
import { Button } from '../../components/common/Button';
import { AddressSection } from './AddressSection';
import { ContractSection } from './ContractSection';

const INPUT_STEPS = ['address', 'contract'] as const;

export function InputPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentStep = INPUT_STEPS[currentStepIndex];

  const handleNext = () => {
    setCurrentStepIndex((prev) => Math.min(prev + 1, INPUT_STEPS.length - 1));
  };

  const handlePrev = () => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <PageWrapper>
      {currentStep === 'address' && (
        <>
          <AddressSection />

          <ButtonArea>
            <Button
              variant="primary"
              size="lg"
              width="100%"
              onClick={handleNext}
            >
              다음
            </Button>
          </ButtonArea>
        </>
      )}

      {currentStep === 'contract' && (
        <>
          <ContractSection />

          <ButtonArea>
            <Button
              variant="outline"
              size="lg"
              width="100%"
              onClick={handlePrev}
            >
              이전
            </Button>

            <Button
              variant="primary"
              size="lg"
              width="100%"
              onClick={handleNext}
            >
              다음
            </Button>
          </ButtonArea>
        </>
      )}
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  min-height: calc(100dvh - 180px);
  display: flex;
  flex-direction: column;
`;

const ButtonArea = styled.div`
  margin-top: auto;
  display: flex;
  gap: 8px;
  padding-top: 24px;
`;
