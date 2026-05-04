import styled from '@emotion/styled';
import { AlertTriangle, CircleAlert, RotateCcw } from 'lucide-react';
import type { AnalysisErrorCode } from '../../types/analysis';
import { ANALYSIS_ERROR_MESSAGES } from '../../constants/analysisErrorMessages';
import { Button } from '../../components/common/Button';

interface AnalysisErrorViewProps {
  errorCode: AnalysisErrorCode;
  onRetry: () => void;
}

export function AnalysisErrorView({
  errorCode,
  onRetry,
}: AnalysisErrorViewProps) {
  const error = ANALYSIS_ERROR_MESSAGES[errorCode];

  return (
    <ErrorWrapper>
      <ErrorContent>
        <IconCircle>
          <AlertTriangle size={46} strokeWidth={2.4} />
        </IconCircle>

        <TextBox>
          <Title>{error.title}</Title>
          <Description>{error.description}</Description>
        </TextBox>

        <GuideCard>
          <GuideIcon>
            <CircleAlert size={20} />
          </GuideIcon>
          <Guide>{error.guide}</Guide>
        </GuideCard>
      </ErrorContent>

      <ButtonWrapper>
        <Button
          variant="primary"
          size="lg"
          width="100%"
          iconStart={<RotateCcw size={18} />}
          onClick={onRetry}
        >
          {error.buttonText}
        </Button>
      </ButtonWrapper>
    </ErrorWrapper>
  );
}

const ErrorWrapper = styled.section`
  min-height: calc(100dvh - 184px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 120px 6px 50px;
`;

const ErrorContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconCircle = styled.div`
  width: 116px;
  height: 116px;
  border-radius: ${({ theme }) => theme.radius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.dangerBg};
  color: ${({ theme }) => theme.colors.danger};
`;

const TextBox = styled.div`
  margin-top: 30px;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  font-weight: 800;
  line-height: 1.45;
  letter-spacing: -0.03em;
`;

const Description = styled.p`
  margin: 10px 0 0;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 13px;
  font-weight: 500;
  line-height: 1.6;
`;

const GuideCard = styled.div`
  width: 100%;
  margin-top: 34px;
  padding: 18px 18px;
  border-radius: ${({ theme }) => theme.radius.xl};
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

const GuideIcon = styled.div`
  margin-top: 2px;
  color: ${({ theme }) => theme.colors.danger};
  flex-shrink: 0;
`;

const Guide = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 14px;
  font-weight: 500;
  line-height: 1.65;
`;

const ButtonWrapper = styled.div`
  width: 100%;
`;
