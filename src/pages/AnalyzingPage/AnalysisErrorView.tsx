import styled from '@emotion/styled';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from '../../components/common/Button';

interface AnalysisErrorViewProps {
  errorMessage: string;
  onRetry: () => void;
}

export function AnalysisErrorView({
  errorMessage,
  onRetry,
}: AnalysisErrorViewProps) {
  return (
    <ErrorWrapper>
      <ErrorContent>
        <IconCircle>
          <AlertTriangle size={46} strokeWidth={2.4} />
        </IconCircle>

        <TextBox>
          <Title>분석을 완료하지 못했어요</Title>
          <Description>{errorMessage}</Description>
        </TextBox>
      </ErrorContent>

      <ButtonWrapper>
        <Button
          variant="primary"
          size="lg"
          width="100%"
          iconStart={<RotateCcw size={18} />}
          onClick={onRetry}
        >
          다시 분석하기
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

const ButtonWrapper = styled.div`
  width: 100%;
`;
