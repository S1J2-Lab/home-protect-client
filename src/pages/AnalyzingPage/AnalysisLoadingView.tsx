import { CircularProgress } from '../../components/feature/AnalyzingPage/CircularProgress';
import { AnalysisStepList } from '../../components/feature/AnalyzingPage/AnalysisStepList';
import { AnalysisNotice } from '../../components/feature/AnalyzingPage/AnalysisNotice';
import type { AnalysisStep } from '../../types/analysis';
import styled from '@emotion/styled';

interface AnalysisLoadingViewProps {
  progress: number;
  steps: AnalysisStep[];
}

export function AnalysisLoadingView({
  progress,
  steps,
}: AnalysisLoadingViewProps) {
  return (
    <>
      <TopSection>
        <CircularProgress value={progress} />

        <TitleBox>
          <SmallTitle>분석 중이에요</SmallTitle>
          <Title>
            전세 사기를 예방하기 위해
            <br />
            꼼꼼하게 <Highlight>분석하고 있어요</Highlight>
          </Title>
          <SmallTitle>잠시만 기다려 주세요.</SmallTitle>
        </TitleBox>
      </TopSection>

      <AnalysisStepList steps={steps} />
      <AnalysisNotice />
    </>
  );
}

const TopSection = styled.section`
  display: flex;
  align-items: center;
  gap: 22px;
`;

const TitleBox = styled.div`
  flex: 1;
`;

const SmallTitle = styled.p`
  margin-top: 9px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  font-weight: 600;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
  font-weight: 600;
  line-height: 1.45;
  letter-spacing: -0.02em;
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;
